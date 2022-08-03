import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GetDefaultCreditCardBackendRequest } from './requests/get/getDefaultCreditCard';
import { PingBackendSecureBackendRequest } from './requests/get/pingBackendSecure';
import { PostCancelSubscriptionPlanBackendRequest, PostCancelSubscriptionPlanData } from './requests/post/cancelSubscriptionPlan';
import { PostDetachCreditCardBackendRequest, PostDetachCreditCardData } from './requests/post/detachCreditCard';
import { PostListCreditCardsBackendRequest } from './requests/get/listCreditCards';
import { PostListSubscriptionPlanBackendRequest } from './requests/get/listSubscriptionPlan';
import { PostNewCreditCardBackendRequest, PostNewCreditCardData } from './requests/post/saveNewCreditCard';
import { PostNewUserClaimsBackendRequest, PostNewUserClaimsData } from './requests/post/setNewUserRoles';
import { PostSubscribePremiumPlanBackendRequest } from './requests/post/subscribePremiumPlan';
import { PostSubscribeStandardPlanBackendRequest } from './requests/post/subscribeStandardPlan';
import { PostUpdateDefaultCreditCardBackendRequest, PostUpdateDefaultCreditCardData } from './requests/post/updateDefaultCreditCard';
import { ListInvoicesBackendRequest } from './requests/get/listInvoices';
import { GetPaymentMethodByIDBackendRequest, GetPaymentMethodByIDData } from './requests/get/getPaymentMethodByID';

/**
 * Class that manages all Backend Requests.
 */
export class BackendRequestHandler {
    private static instance: BackendRequestHandler;
    private backendRequest!: AxiosInstance;

    // Test
    private pingBackendSecureBR!: PingBackendSecureBackendRequest;
    // New User
    private setNewUserRolesBR!: PostNewUserClaimsBackendRequest;
    // New Credit Card
    private saveNewCreditCardBR!: PostNewCreditCardBackendRequest;
    // Update Credit Card
    private updateDefaultCreditCardBR!: PostUpdateDefaultCreditCardBackendRequest;
    // Subscribe Standard Plan
    private subscribeStandardPlanBR!: PostSubscribeStandardPlanBackendRequest;
    // Subscribe Premium Plan
    private subscribePremiumPlanBR!: PostSubscribePremiumPlanBackendRequest;
    // List Subscription Plan
    private listSubscriptionPlanBR!: PostListSubscriptionPlanBackendRequest;
    // Cancel Subscription Plan
    private cancelSubscriptionPlanBR!: PostCancelSubscriptionPlanBackendRequest;
    // List Credit Cards
    private listCreditCardsBR!: PostListCreditCardsBackendRequest;
    // Detach Credit Card
    private detachCreditCardBR!: PostDetachCreditCardBackendRequest;
    // Get User's Default Credit Card
    private getDefaultCreditCardBR!: GetDefaultCreditCardBackendRequest;
    // List invoices
    private listInvoiceBR!: ListInvoicesBackendRequest;
    // Get Payment Method By ID
    private getPaymentMethodByIDBR!: GetPaymentMethodByIDBackendRequest;

    /**
     * Private constructor.
     */
    private constructor() {}

    /**
     * Returns instance of the class.
     *
     * @returns Instance.
     */
    public static getInstance(): BackendRequestHandler {
        if (!BackendRequestHandler.instance) {
            BackendRequestHandler.instance = new BackendRequestHandler();
        }

        return BackendRequestHandler.instance;
    }

    public initInstances = (backendRequest: AxiosInstance) => {
        this.backendRequest = backendRequest;

        this.pingBackendSecureBR = new PingBackendSecureBackendRequest(this.backendRequest);
        this.setNewUserRolesBR = new PostNewUserClaimsBackendRequest(this.backendRequest);
        this.saveNewCreditCardBR = new PostNewCreditCardBackendRequest(this.backendRequest);
        this.updateDefaultCreditCardBR = new PostUpdateDefaultCreditCardBackendRequest(this.backendRequest);
        this.subscribeStandardPlanBR = new PostSubscribeStandardPlanBackendRequest(this.backendRequest);
        this.subscribePremiumPlanBR = new PostSubscribePremiumPlanBackendRequest(this.backendRequest);
        this.listSubscriptionPlanBR = new PostListSubscriptionPlanBackendRequest(this.backendRequest);
        this.cancelSubscriptionPlanBR = new PostCancelSubscriptionPlanBackendRequest(this.backendRequest);
        this.listCreditCardsBR = new PostListCreditCardsBackendRequest(this.backendRequest);
        this.detachCreditCardBR = new PostDetachCreditCardBackendRequest(this.backendRequest);
        this.getDefaultCreditCardBR = new GetDefaultCreditCardBackendRequest(this.backendRequest);
        this.listInvoiceBR = new ListInvoicesBackendRequest(this.backendRequest);
        this.getPaymentMethodByIDBR = new GetPaymentMethodByIDBackendRequest(this.backendRequest);
    };

    public pingBackendSecure = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.pingBackendSecureBR.run(config, idToken);
    };

    public setNewUserRoles = async (idToken: string, data: PostNewUserClaimsData, config?: AxiosRequestConfig) => {
        return this.setNewUserRolesBR.run(config, [idToken, data]);
    };

    public saveNewCreditCard = async (idToken: string, data: PostNewCreditCardData, config?: AxiosRequestConfig) => {
        return this.saveNewCreditCardBR.run(config, [idToken, data]);
    };

    public updateDefaultCard = async (idToken: string, data: PostUpdateDefaultCreditCardData, config?: AxiosRequestConfig) => {
        return this.updateDefaultCreditCardBR.run(config, [idToken, data]);
    };

    public subscribeStandardPlan = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.subscribeStandardPlanBR.run(config, idToken);
    };

    public subscribePremiumPlan = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.subscribePremiumPlanBR.run(config, idToken);
    };

    public listSubscriptionPlan = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.listSubscriptionPlanBR.run(config, idToken);
    };

    public cancelSubscriptionPlan = async (idToken: string, data: PostCancelSubscriptionPlanData, config?: AxiosRequestConfig) => {
        return this.cancelSubscriptionPlanBR.run(config, [idToken, data]);
    };

    public listCards = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.listCreditCardsBR.run(config, idToken);
    };

    public listInvoices = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.listInvoiceBR.run(config, idToken);
    };

    public detachCard = async (idToken: string, data: PostDetachCreditCardData, config?: AxiosRequestConfig) => {
        return this.detachCreditCardBR.run(config, [idToken, data]);
    };

    public getDefaultCard = async (idToken: string, config?: AxiosRequestConfig) => {
        return this.getDefaultCreditCardBR.run(config, idToken);
    };

    public getPaymentMethodById = async (idToken: string, data: GetPaymentMethodByIDData, config?: AxiosRequestConfig) => {
        return this.getPaymentMethodByIDBR.run(config, [idToken, data]);
    };
}
