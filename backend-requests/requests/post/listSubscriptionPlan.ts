import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { IBackendRequest } from '../../base/iBackendRequest';

/**
 * Data for setting new user claims.
 */
export interface PostListSubscriptionPlanData {
	uid: string;
}

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
	run = async (config?: AxiosRequestConfig<any>, data?: [string, PostListSubscriptionPlanData]): Promise<[boolean, any]> => {
		if (!data) return [false, { Error: 'Data cannot be undefined' }];

		try {
			const extendedAxiosConfig: AxiosRequestConfig = {
				...config,
				headers: {
					Authorization: `Bearer ${data[0]}`,
				},
			};
			const res = await this.backendRequest.post('/users/subscriptions/list', data[1], extendedAxiosConfig);
			return [false, res.data];
		} catch (_err) {
			const err = _err as AxiosError;
			return [true, err.response?.data];
		}
	};
}
