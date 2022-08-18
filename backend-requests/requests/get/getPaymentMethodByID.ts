import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBackendRequest } from '../../base/iBackendRequest';

/**
 * Data for setting new user claims.
 */
export interface GetPaymentMethodByIDData {
    paymentMethodID: string;
}
/**
 * Backend request to get user's Payment Method by ID
 */
export class GetPaymentMethodByIDBackendRequest implements IBackendRequest {
    backendRequest: AxiosInstance;
    actionName: string;

    constructor(backendRequest: AxiosInstance) {
        this.backendRequest = backendRequest;
        this.actionName = 'Get Payment Method By ID';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run = async (config?: AxiosRequestConfig<any>, data?: [string, GetPaymentMethodByIDData]): Promise<[boolean, any]> => {
        if (!data) return [false, { Error: 'Data cannot be undefined' }];

        try {
            const extendedAxiosConfig: AxiosRequestConfig = {
                ...config,
                headers: {
                    Authorization: `Bearer ${data[0]}`,
                },
            };
            const res = await this.backendRequest.get(`/users/payment-method/${data[1]}`, extendedAxiosConfig);
            return [false, res.data];
        } catch (_err) {
            const err = _err as AxiosError;
            return [true, err.response?.data];
        }
    };
}
