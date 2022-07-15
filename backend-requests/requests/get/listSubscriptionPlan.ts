import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBackendRequest } from '../../base/iBackendRequest';

/**
 * Backend request that sets new user claims for newly signed on users.
 */
export class PostListSubscriptionPlanBackendRequest implements IBackendRequest {
    backendRequest: AxiosInstance;
    actionName: string;

    constructor(backendRequest: AxiosInstance) {
        this.backendRequest = backendRequest;
        this.actionName = 'List Subscription Plans';
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
            const res = await this.backendRequest.get('/users/subscriptions/list', extendedAxiosConfig);
            return [false, res.data];
        } catch (_err) {
            const err = _err as AxiosError;
            return [true, err.response?.data];
        }
    };
}
