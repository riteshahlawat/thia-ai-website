import { ContentContainer } from '@/components/common/ContentContainer';
import { SeoPage } from '@/components/seo/SeoPage';
import { Center, VStack, Text, Heading, useColorModeValue } from '@chakra-ui/react';
import React, { Props } from 'react';

const TermsOfService = () => {
    return (
        <SeoPage title='Terms and Conditions' description='Terms and Conditions'>
            <ContentContainer>
                <VStack pb='var(--header-height)' pt='4' spacing='6'>
                    <Heading>TERMS AND CONDITIONS</Heading>
                    <LightText>
                        These terms and conditions (the &quot;Terms and Conditions&quot;) govern the use of https://thia.tech (the
                        &quot;Site&quot;). This Site is owned and operated by Thia AI. This Site is a application. By using this Site, you
                        indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times. THESE
                        TERMS AND CONDITIONS CONTAIN A DISPUTE RESOLUTION CLAUSE THAT IMPACTS YOUR RIGHTS ABOUT HOW TO RESOLVE DISPUTES.
                        PLEASE READ IT CAREFULLY.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Intellectual Property
                    </Heading>
                    <LightText>
                        All content published and made available on our Site is the property of Thia AI and the Site&rsquo;s creators. This
                        includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to
                        the composition of our Site.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Accounts
                    </Heading>
                    <LightText>
                        When you create an account on our Site, you agree to the following:
                        <br />
                        1. You are solely responsible for your account and the security and privacy of your account, including passwords or
                        sensitive information attached to that account; and
                        <br />
                        2. All personal information you provide to us through your account is up to date, accurate, and truthful and that
                        you will update your personal information if it changes.
                        <br />
                        We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate
                        these Terms and Conditions.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Sale of Goods
                    </Heading>
                    <LightText>
                        These Terms and Conditions govern the sale of goods available on our Site. The following goods are available on our
                        Site: AutoML. These Terms and Conditions apply to all the goods that are displayed on our Site at the time you
                        access it. This includes all products listed as being out of stock. All information, descriptions, or images that we
                        provide about our goods are as accurate as possible. However, we are not legally bound by such information,
                        descriptions, or images as we cannot guarantee the accuracy of all goods we provide. You agree to purchase goods
                        from our Site at your own risk. We reserve the right to modify, reject or cancel your order whenever it becomes
                        necessary. If we cancel your order and have already processed your payment, we will give you a refund equal to the
                        amount you paid. You agree that it is your responsibility to monitor your payment instrument to verify receipt of
                        any refund.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Subscriptions
                    </Heading>
                    <LightText>
                        Your subscription automatically renews and you will be automatically billed until we receive notification that you
                        want to cancel the subscription.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Payments
                    </Heading>
                    <LightText>
                        We accept the following payment methods on our Site: Credit Card, PayPal, and Debit. When you provide us with your
                        payment information, you authorize our use of and access to the payment instrument you have chosen to use. By
                        providing us with your payment information, you authorize us to charge the amount due to this payment instrument. If
                        we believe your payment has violated any law or these Terms and Conditions, we reserve the right to cancel or
                        reverse your transaction.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Consumer Protection Law
                    </Heading>
                    <LightText>
                        Where the Consumer Protection Act, or any other consumer protection legislation in your jurisdiction applies and
                        cannot be excluded, these Terms and Conditions will not limit your legal rights and remedies under that legislation.
                        These Terms and Conditions will be read subject to the mandatory provisions of that legislation. If there is a
                        conflict between these Terms and Conditions and that legislation, the mandatory provisions of the legislation will
                        apply.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Limitation of Liability
                    </Heading>
                    <LightText>
                        Thia AI and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any
                        actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the Site.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Indemnity
                    </Heading>
                    <LightText>
                        Except where prohibited by law, by using this Site you indemnify and hold harmless Thia AI and our directors,
                        officers, agents, employees, subsidiaries, and affiliates from any actions, claims, losses, damages, liabilities and
                        expenses including legal fees arising out of your use of our Site or your violation of these Terms and Conditions.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Applicable Law
                    </Heading>
                    <LightText>These Terms and Conditions are governed by the laws of the Province of Ontario.</LightText>

                    <Heading as='h3' fontSize='xl'>
                        Dispute Resolution
                    </Heading>
                    <LightText>
                        Subject to any exceptions specified in these Terms and Conditions, if you and Thia AI are unable to resolve any
                        dispute through informal discussion, then you and Thia AI agree to submit the issue before an arbitrator. The
                        decision of the arbitrator will be final and binding. Any arbitrator must be a neutral party acceptable to both you
                        and Thia AI. The costs of any arbitration will be paid by the unsuccessful party.
                        <br />
                        Notwithstanding any other provision in these Terms and Conditions, you and Thia AI agree that you both retain the
                        right to bring an action in small claims court and to bring an action for injunctive relief or intellectual property
                        infringement.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Severability
                    </Heading>
                    <LightText>
                        If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid
                        under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All
                        other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be
                        considered valid.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Changes
                    </Heading>
                    <LightText>
                        These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to
                        reflect any changes to the way we operate our Site and the way we expect users to behave on our Site. We will notify
                        users by email of changes to these Terms and Conditions or post a notice on our Site.
                    </LightText>

                    <Heading as='h3' fontSize='xl'>
                        Contact Details
                    </Heading>
                    <LightText>
                        Please contact us if you have any questions or concerns. To contact us, visit our support page (link is located at
                        the bottom of our page).
                    </LightText>
                </VStack>
            </ContentContainer>
        </SeoPage>
    );
};

interface LightTextProps {
    children?: React.ReactNode;
}

export const LightText = ({ children }: LightTextProps) => {
    const color = useColorModeValue('thia.gray.700', 'thia.gray.600');
    return (
        <Text color={color} fontSize='13px' fontWeight='light' fontFamily='Open Sans' textAlign='center'>
            {children}
        </Text>
    );
};

export default TermsOfService;
