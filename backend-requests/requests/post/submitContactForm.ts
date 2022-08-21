import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { SupportContactFormValues } from 'pages/support';
import { IBackendRequest } from '../../base/iBackendRequest';

export interface SubmitContactFormData extends SupportContactFormValues {
    dev?: boolean;
}
export class SubmitContactFormBackendRequest implements IBackendRequest {
    backendRequest: AxiosInstance;
    actionName: string;

    constructor(backendRequest: AxiosInstance) {
        this.backendRequest = backendRequest;
        this.actionName = 'Submit Contact Form';
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run = async (config?: AxiosRequestConfig<any>, data?: SubmitContactFormData): Promise<[boolean, any]> => {
        if (!data) return [false, { Error: 'Data cannot be undefined' }];

        try {
            const res = await this.backendRequest.post('/mailer/contact-us', data, config);
            return [false, res.data];
        } catch (_err) {
            const err = _err as AxiosError;
            return [true, err.response?.data];
        }
    };
}
