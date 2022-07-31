import { BillingValuesType } from '@/components/billing/PaymentDetails/PaymentForm';
import { useToast } from '@chakra-ui/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentMethodCreateParams } from '@stripe/stripe-js';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from 'reactfire';
import Stripe from 'stripe';
import { BackendRequestHandler } from '../../backend-requests/backendRequestHandler';

function submitCardElement(onSuccess: () => void | Promise<void>, onFail: () => void | Promise<void>, defaultCreditCardID: string | null) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const toast = useToast();
    const stripe = useStripe();
    const elements = useElements();
    const { data: user } = useUser();

    const getPaymentMethodID = async (billingDetails: PaymentMethodCreateParams.BillingDetails) => {
        const cardElement = elements?.getElement(CardElement);

        if (!stripe || !elements || !cardElement) {
            return;
        }

        console.log(billingDetails);
        const stripeResponse = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
        });

        const { error, paymentMethod } = stripeResponse;

        if (error || !paymentMethod) {
            return;
        }

        return paymentMethod.id;
    };

    const handleSubmit = async (billingDetails: PaymentMethodCreateParams.BillingDetails) => {
        if (user && stripe) {
            setSubmitLoading(true);
            const paymentMethodID = await getPaymentMethodID(billingDetails);

            if (!paymentMethodID) {
                return;
            }

            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().saveNewCreditCard(idToken, {
                paymentMethodID,
            });

            if (!isError) {
                const clientSecret = response.client_secret;
                await stripe.confirmCardSetup(clientSecret, {
                    payment_method: paymentMethodID,
                });
                if (!defaultCreditCardID) {
                    // If the user does not have a default credit card, then update the new card to be their default
                    await BackendRequestHandler.getInstance().updateDefaultCard(idToken, {
                        paymentMethodID,
                    });
                }

                toast({
                    title: 'Success',
                    description: 'Card was added to your account',
                    status: 'success',
                    duration: 2500,
                    isClosable: false,
                });
                await onSuccess();
            } else {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
                await onFail();
            }
            setSubmitLoading(false);
        }
    };

    return {
        handleSubmit,
        isCardSubmitting: submitLoading,
    };
}

export default submitCardElement;
