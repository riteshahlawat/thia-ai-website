import React, { useCallback, useEffect, useState } from 'react';
import Stripe from 'stripe';
import { useUser } from 'reactfire';
import { Box, Divider, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import { IdTokenResult } from 'firebase/auth';
import { ContentContainer } from '@/components/common/ContentContainer';
import { InvoiceTable } from '@/components/billing/InvoiceTable';
import { SubscriptionOverview as SubscriptionOverview } from '@/components/billing/SubscriptionOverview';
import { PaymentOverview } from '@/components/billing/PaymentDetails/PaymentOverview';
import { SeoPage } from '@/components/seo/SeoPage';
import { PlanSelection } from '@/components/billing/PlanSelection';
import { GetServerSideProps } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2020-08-27',
    typescript: true,
});

const Billing = ({ products }: { products: any }) => {
    const router = useRouter();

    const { data: user } = useUser();
    const [invoices, setInvoices] = useState<Stripe.Invoice[]>();
    const [userIdToken, setUserIdToken] = useState<IdTokenResult>();
    const [subscription, setSubscription] = useState<Stripe.Subscription>();
    const [subscriptionDataLoaded, setSubscriptionDataLoaded] = useState(false);
    const [cancelledDate, setCancelledDate] = useState<number | null>(null);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<Stripe.PaymentMethod>();

    useEffect(() => {
        if (user === null) router.push('/signin');
        loadData();
    }, [user]);

    const fetchClaims = async () => {
        if (user) {
            const idToken = await user.getIdTokenResult(true);
            // console.log('Role:', idToken.claims);
            setUserIdToken(idToken);
        }
    };

    const fetchData = async () => {
        if (user) {
            setSubscriptionDataLoaded(false);
            const idToken = await user.getIdToken();
            const [[isInvoiceListError, invoiceListdRes], [isSubscriptionListError, subscriptionListRes]] = await Promise.all([
                BackendRequestHandler.getInstance().listInvoices(idToken),
                BackendRequestHandler.getInstance().listSubscriptionPlan(idToken),
            ]);

            if (!isInvoiceListError) setInvoices(invoiceListdRes.data);
            // console.log('invoices:', invoiceListdRes);

            if (!isSubscriptionListError) {
                // console.log('subscription:', subscriptionListRes.data[0]);
                setSubscription(subscriptionListRes.data[0]);
                setCancelledDate(subscriptionListRes.data[0]?.cancel_at);
            }
            setSubscriptionDataLoaded(true);
        }
    };

    const fetchDefaultPaymentMethod = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isDefaultCardError, defaultCardRes] = await BackendRequestHandler.getInstance().getDefaultCard(idToken);
            if (!isDefaultCardError && defaultCardRes) {
                const [isPaymentMethodError, paymentMethodRes] = await BackendRequestHandler.getInstance().getPaymentMethodById(
                    idToken,
                    defaultCardRes
                );
                setDefaultPaymentMethod(!isPaymentMethodError ? paymentMethodRes : undefined);
            } else {
                setDefaultPaymentMethod(undefined);
            }
        }
    };

    const loadData = useCallback(async () => {
        fetchData();
        fetchClaims();
        fetchDefaultPaymentMethod();
    }, [user]);

    const role = userIdToken?.claims.role as string;
    const product =
        products.find((p: Stripe.Product) => p.id === subscription?.items.data[0].plan?.product) ??
        products.find((p: Stripe.Product) => p.name === 'Freemium');

    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
        return (
            <Box pb={5}>
                <Heading fontSize='lg' fontWeight='semibold'>
                    {title}
                </Heading>
                <Text color={secondaryTextColor} fontSize='sm' pt={1}>
                    {subtitle}
                </Text>
            </Box>
        );
    };

    return (
        <SeoPage title='Billing'>
            <ContentContainer>
                <Box my={9}>
                    <Box>
                        <Heading>Billing and Plans</Heading>
                        <Text color={secondaryTextColor} pt={2}>
                            Manage your billing and payment details
                        </Text>
                    </Box>
                    <Divider my={7} />
                    <Flex gap={10} flexDir='column'>
                        <Flex gap={7} flexDir={{ base: 'column', lg: 'row' }}>
                            <SubscriptionOverview
                                subscription={subscription}
                                product={product}
                                cancelledDate={cancelledDate}
                                subscriptionLoaded={subscriptionDataLoaded}
                            />
                            <PaymentOverview defaultPaymentMethod={defaultPaymentMethod} updateData={fetchDefaultPaymentMethod} />
                        </Flex>
                        <Box>
                            <Header title='Plans' subtitle='Change your plan according to your needs' />
                            <PlanSelection
                                plans={products}
                                currentPlan={role}
                                cancelledDate={cancelledDate}
                                subscriptionID={subscription?.id ?? ''}
                                getSubscriptionDataCallback={loadData}
                                isPaymentMethod={!!defaultPaymentMethod}
                            />
                        </Box>
                        <Box>
                            <Header title='Invoices' subtitle='View and download invoices' />
                            <InvoiceTable invoices={invoices} />
                        </Box>
                    </Flex>
                </Box>
            </ContentContainer>
        </SeoPage>
    );
};

export default Billing;

export const getServerSideProps: GetServerSideProps = async () => {
    const productList = await stripe.products.list({ active: true });
    const getPriceObj = (id: any) => stripe.prices.retrieve(id);
    const products = await Promise.all(
        productList.data
            .filter((_: Stripe.Product) => _.metadata.type === 'subscription_package')
            .sort((a, b) => parseInt(a.metadata.tier) - parseInt(b.metadata.tier))
            .map(async obj => ({ ...obj, price: await getPriceObj(obj.default_price) }))
    );
    return { props: { products } };
};
