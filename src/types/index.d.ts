import { Dispatch, SetStateAction, ReactNode } from "react";
import type { FormInstance, GetProp, UploadFile, UploadProps } from 'antd';
import { AxiosResponse } from 'axios';
import { UseMutateAsyncFunction } from "@tanstack/react-query";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type UploadComponentProps = {
    fileList: UploadFile[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<ApiFileUploadResponse, any>, Error, FormData, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: FormInstance<any>,
    fileName: string,
    previewImage: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPreviewImage: Dispatch<any>,
    previewOpen: boolean,
    setPreviewOpen: Dispatch<SetStateAction<boolean>>,
    dragAreaText?: string,
    validType?: string[]
}
interface ModalComponentProps {
    isModalOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void,
    message: ReactNode;
    href: boolean,
    maskClosable?:boolean

}
interface ModalState {
    isModalOpen: boolean,
    message: string | ReactNode
    href: boolean
}

type ModalAction = Partial<ModalState>;

interface LoanState {
    bank_code: string;
    account_number: string;
    bank_name: string;
    accountStatus: "" | "validating" | "success" | "warning" | "error" | undefined;
    existingUserErrors?: string[]
}

type LoanAction = Partial<LoanState>;

type LoanFormComponentProps = {
    current: number
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
}


interface UseLoanProps {
    name?: string
}

interface RepaymentState extends ModalState {
    amount: string;
    repayment_period: string;
}

type RepaymentAction = Partial<RepaymentState>;

interface RepaymentTableProps {
    key: string;
    repayment_date: string;
    amount: number;
    status: string;
    interest_rate: string,
}

//api types

type Bank = {
    id: number;
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string;
    pay_with_bank: boolean;
    supports_transfer: boolean;
    active: boolean;
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

type ApiBankResponse = {
    status: boolean;
    payload: Bank[];
    msg: string;
}

type ApiFileUploadResponse = {
    payload: {
        url: string
    }
}

type ApiError = {
    response: {
        data: {
            success: boolean,
            message: string,
        }
    }
}

type ApiExistingUser = {
    payload: {
        company_id: number,
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
        is_active: boolean,
        fullname: string,
        company: string,
        employee_bank_account: {
            account_number: string,
            bank_code: string,
            bank_name: string,

        },
        employee_kyc: {
            id: number,
            bvn: string,
            verification_type: string,
            image_url: string,
            verification_url: string,
            user_id: number
        },

        is_from_old_system: boolean,
        address: string,
        monthly_income: number,
        employment_date: string,
        contract_type: string
        employer_name: string
    },
    success: boolean
}
interface RequestLoan {
    repayment_period: number,
    amount: string,
    email: string,
    phone: string,
    firstname: string,
    lastname: string,
    address: string,
    employer_name: string,
    employment_date: string,
    contract_type: string,
    monthly_income: string,
    account_number: string,
    bank_code: string,
    bvn: string,
    bank_name: string
}

type ApiRequestLoan = {
    payload: {
        data: {
            user: {
                id: 49,
                reference: string,
                email: string,
                phone: string,
                password: string | null,
                firstname: string,
                lastname: string,
                address: string,
                is_verified: boolean,
                is_active: boolean,
                employment_date: string,
                contract_type: string,
                monthly_income: string,
                is_from_old_system: boolean,
                employer_name: string,
                created_at: string,
                updated_at: string

            },
            loan: {
                id: number,
                repayment_period: number,
                employee_id: number,
                loan_product: null,
                loan_product_id: null,
                approved_date: null,
                rejected_reason: null,
                status: string,
                reference: string,
                loan_type: string,
                statement_url: string | null,
                created_at: string,
                updated_at: string

            },
            repayment: {
                count: number
            }

        },

    },
    success: boolean
}

type MinimumLoanResponse = {
    status: boolean;
    payload: {
        min_amount: string
    };
    msg: string;
}
interface RepaymentInfo {
    repayment_period: number,
    amount: number
}
interface ApiRepaymentInfo {
    payload: {
        key: string;
        repayment_date: string;
        amount: number;
        status: string;
        interest_rate: string,

    }[]

}

type ApiRequestInvoice = {
    success: boolean,
    payload: {
        status: boolean,
        message: string,
        data: {
            id: number,
            email: string,
            company_name: string,
            phone: string,
            purchase_order_url: string,
            invoice_url: string,
            address: string,
            external_invoice_id: string
            reference: string
        }
    }
}

type ApiInvoiceError = {
    success: boolean,
    error: {
        response: {
            message: string[],
        }
    }
}