import { useToast } from '@chakra-ui/react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';
import { useUser } from 'reactfire';
import { BackendRequestHandler } from '../../backend-requests/backendRequestHandler';

function submitCardElement(onSuccess: () => void, onFail: () => void) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const toast = useToast();
    const stripe = useStripe();
    const elements = useElements();
    const { data: user } = useUser();

    const getPaymentMethodID = async () => {
        const cardElement = elements?.getElement(CardElement);

        if (!stripe || !elements || !cardElement) {
            return;
        }

        const stripeResponse = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        const { error, paymentMethod } = stripeResponse;

        if (error || !paymentMethod) {
            return;
        }

        return paymentMethod.id;
    };

    const handleSubmit = async (event: FormEvent) => {
        if (user && stripe) {
            event.preventDefault();
            setSubmitLoading(true);
            const paymentMethodID = await getPaymentMethodID();

            if (!paymentMethodID) {
                return;
            }

            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().saveNewCreditCard(idToken, {
                uid: user.uid,
                paymentMethodID,
            });

            if (!isError) {
                const clientSecret = response.client_secret;
                await stripe.confirmCardSetup(clientSecret, {
                    payment_method: paymentMethodID,
                });
                await BackendRequestHandler.getInstance().updateDefaultCreditCard(idToken, {
                    uid: user.uid,
                    paymentMethodID,
                });
                toast({
                    title: 'Success',
                    description: 'Card was added to your account',
                    status: 'success',
                    duration: 2500,
                    isClosable: false,
                });
                onSuccess();
            } else {
                console.log(response);
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
                onFail();
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
