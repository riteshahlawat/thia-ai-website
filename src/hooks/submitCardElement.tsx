import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { FormEvent } from 'react';
import { useUser } from 'reactfire';
import { BackendRequestHandler } from '../../backend-requests/backendRequestHandler';

function submitCardElement() {
    const stripe = useStripe();
    const elements = useElements();
    const { data: user } = useUser();
    const getPaymentMethodID = async () => {
        const cardElement = elements?.getElement(CardElement);

        if (!stripe || !elements || !cardElement) {
            return;
        }

        const stripeResponse = await stripe?.createPaymentMethod({
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
        if (user) {
            event.preventDefault();

            const paymentMethodID = await getPaymentMethodID();

            if (!paymentMethodID) {
                return;
            }

            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().saveNewCreditCard(
                idToken,
                {
                    uid: user.uid,
                    paymentMethodID: paymentMethodID,
                }
            );

            if (!isError) {
                console.log(response);
                const clientSecret = response.client_secret;
                stripe?.confirmCardSetup(clientSecret);
                await BackendRequestHandler.getInstance().updateDefaultCreditCard(
                    idToken,
                    {
                        uid: response.customer,
                        paymentMethodID: response.payment_method,
                    }
                )
            }
        }
    };

    return {
        handleSubmit,
    };
}

export default submitCardElement;
