 
import axios, { AxiosError, AxiosResponse } from "axios";
import type { ApiBankResponse, ApiError, ApiExistingUser, ApiFileUploadResponse, ApiInvoiceError, ApiRepaymentInfo, ApiRequestInvoice, ApiRequestLoan, MinimumLoanResponse, RepaymentInfo, RequestLoan } from "../types";

const uploadInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASEURL,
	headers: {
		"Content-Type": "multipart/form-data",
	},
	
});

const baseInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASEURL,
	headers: {
		"Content-Type": "application/json",
	},
	
});
class API {
    async upload(data:FormData): Promise<AxiosResponse<ApiFileUploadResponse>> {
        try {
            const response = await uploadInstance.post("/upload", data);            
            return response;
        } catch (error) {
            throw error as AxiosError;
        }
    }

    async fetchBank(): Promise<AxiosResponse<ApiBankResponse>> {
        try {
            const response = await baseInstance.get("/misc/banks");            
            return response;
        } catch (error) {
            throw error as AxiosError;
        }
    }
    async minimumLoan(): Promise<AxiosResponse<MinimumLoanResponse>> {
        try {
            const response = await baseInstance.get("/loan/config");
            return response;
        } catch (error) {
            throw error as Promise<AxiosError<ApiError>>;
        }
    }
    async requestLoan(data: RequestLoan): Promise<AxiosResponse<ApiRequestLoan>> {
        try {
            const response = await baseInstance.post("/loan/request", data);
            return response;
        } catch (error) {
            throw error as Promise<AxiosError<ApiError>>;
        }
    }
    async externalRequestLoan(data: RequestLoan): Promise<AxiosResponse<ApiRequestLoan>> {
        try {
            const response = await baseInstance.post("/loan/request", data);
            return response;
        } catch (error) {
            throw error as Promise<AxiosError<ApiError>>;
        }
    }
    async repaymentDate(data: RepaymentInfo): Promise<AxiosResponse<ApiRepaymentInfo>> {
        try {
            const response = await baseInstance.post("/loan/repayments", data);
            return response;
        } catch (error) {
            throw error as AxiosError;
        }
    }
    async getExistingUser(data: { account_number: string, phone: string, bank_code: string }): Promise<AxiosResponse<ApiExistingUser>> {
        try {
            const response = await baseInstance.post("/users/check/employee", data);
            return response;
        } catch (error) {
            throw error as AxiosError;
        }
    }
    async requestInvoice(data: ApiRequestInvoice): Promise<AxiosResponse<ApiRequestInvoice>> {
        try {
            const response = await baseInstance.post("/invoice/internal", data);
            return response;
        } catch (error) {
            throw error as Promise<AxiosError<ApiInvoiceError>>;
        }
    }
   
}

export const Api = new API();
