import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBackendRequest } from '../../base/iBackendRequest';

/**
 * Data for subscribing to newsletter
 */
export interface SubscribeToNewsletterData {
    email: string;
}

/**
 * Backend request that subscribes email to our newsletter.
 */
export class SubscribeToNewsletterBackendRequest implements IBackendRequest {
    backendRequest: AxiosInstance;
    actionName: string;

    constructor(backendRequest: AxiosInstance) {
        this.backendRequest = backendRequest;
        this.actionName = 'Subscribe to Newsletter';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run = async (config?: AxiosRequestConfig<any>, data?: SubscribeToNewsletterData): Promise<[boolean, any]> => {
        if (!data) return [false, { Error: 'Data cannot be undefined' }];

        try {
            const res = await this.backendRequest.post('/newsletter/subscribe', data, config);
            return [false, res.data];
        } catch (_err) {
            const err = _err as AxiosError;
            return [true, err.response?.data];
        }
    };
}
