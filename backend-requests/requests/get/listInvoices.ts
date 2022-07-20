import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBackendRequest } from '../../base/iBackendRequest';

/**
 * Backend request that lists user invoices from stripe.
 */
export class ListInvoicesBackendRequest implements IBackendRequest {
    backendRequest: AxiosInstance;
    actionName: string;

    constructor(backendRequest: AxiosInstance) {
        this.backendRequest = backendRequest;
        this.actionName = 'List Invoices';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run = async (config?: AxiosRequestConfig<any>, data?: string): Promise<[boolean, any]> => {
        if (!data) return [false, { Error: 'Data cannot be undefined' }];

        try {
            const extendedAxiosConfig: AxiosRequestConfig = {
                ...config,
                headers: {
                    Authorization: `Bearer ${data}`,
                },
            };
            const res = await this.backendRequest.get('/users/invoices', extendedAxiosConfig);
            return [false, res.data];
        } catch (_err) {
            const err = _err as AxiosError;
            return [true, err.response?.data];
        }
    };
}
