import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBackendRequest } from '../../base/iBackendRequest';
import { BackendError } from '../types';

export interface GetDownloadMetadataResponse {
    version: string;
    url: string;
    size: number;
    releaseDate: string;
}

export class GetDownloadMetadataBackendRequest implements IBackendRequest {
    backendRequest: AxiosInstance;
    actionName: string;

    constructor(backendRequest: AxiosInstance) {
        this.backendRequest = backendRequest;
        this.actionName = 'Get Download Metadata';
    }

    run = async (config?: AxiosRequestConfig<any>, data?: any): Promise<[true, BackendError] | [false, GetDownloadMetadataResponse]> => {
        try {
            const res = await this.backendRequest.get('/download/metadata', config);
            return [false, res.data];
        } catch (_err) {
            const err = _err as AxiosError;
            return [true, err.response?.data as BackendError];
        }
    };
}
