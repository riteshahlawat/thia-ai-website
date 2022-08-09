import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { useUser } from 'reactfire';
import { Box, Divider, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import { IdTokenResult } from 'firebase/auth';
import { ContentContainer } from '@/components/common/ContentContainer';
import { InvoiceTable } from '@/components/billing/InvoiceTable';
import { SubscriptionOverview as SubscriptionOverview } from '@/components/billing/subscriptionDetails/SubscriptionOverview';
import { PaymentOverview } from '@/components/billing/PaymentDetails/PaymentOverview';
import { SeoPage } from '@/components/seo/SeoPage';

const Billing = () => {
    const router = useRouter();

    const { data: user } = useUser();
    const [invoices, setInvoices] = useState<Stripe.Invoice[]>();
    const [userIdToken, setUserIdToken] = useState<IdTokenResult>();
    // const [dataLoading, setDataLoading] = useState(false);

    const loadData = async () => {
        // setDataLoading(true);
        await fetchClaims();
        await fetchInvoices();
        // setDataLoading(false);
    };

    const fetchClaims = async () => {
        if (user) {
            const idToken = await user.getIdTokenResult(true);
            console.log('Role:', idToken.claims);

            setUserIdToken(idToken);
        }
    };

    const fetchInvoices = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isInvoiceListError, invoiceListdRes] = await BackendRequestHandler.getInstance().listInvoices(idToken);

            if (!isInvoiceListError) {
                console.log('invoices:', invoiceListdRes.data);
                setInvoices(invoiceListdRes.data);
            }
        }
    };

    useEffect(() => {
        if (user === null) router.push('/signin');
        loadData();
    }, [user]);

    const role = userIdToken?.claims.role as string;
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
        return (
            <Box mt={3}>
                <Heading fontSize='lg' fontWeight='semibold'>
                    {title}
                </Heading>
                <Text color={secondaryTextColor} pt={2}>
                    {subtitle}
                </Text>
            </Box>
        );
    };

    return (
        <SeoPage title='Billing'>
            <ContentContainer>
                <Flex gap={8} flexDir='column' mt={8}>
                    <Box>
                        <Heading>Billing</Heading>
                        <Text color={secondaryTextColor} pt={2}>
                            Manage your billing and payment details
                        </Text>
                    </Box>
                    <Divider />
                    <Flex gap={7} flexDir={{ base: 'column', lg: 'row' }}>
                        <SubscriptionOverview role={role} />
                        <PaymentOverview />
                    </Flex>
                    <Header title='Invoices' subtitle='View and download invoices' />
                    <InvoiceTable invoices={invoices} />
                </Flex>
            </ContentContainer>
        </SeoPage>
    );
};

export default Billing;

// export const getServerSideProps = async () => {
//     const products = await stripe.products.list({ active: true });
//     const getPriceObj = (id: any) => stripe.prices.retrieve(id);
//     const plans = await Promise.all(
//         products.data
//             .filter((_: Stripe.Product) => _.metadata.type === 'subscription_package')
//             .sort((a, b) => parseInt(a.metadata.tier) - parseInt(b.metadata.tier))
//             .map(async obj => ({ ...obj, price: await getPriceObj(obj.default_price) }))
//     );
//     return { props: { plans } };
// };

// export const getServerSideProps = async () => {
//     const { data: user } = useUser();
//     if (user) {
//         const idToken = await user?.getIdToken();
//         const res = await BackendRequestHandler.getInstance().listSubscriptionPlan(idToken);
//         console.log(res)
//     }
// };
