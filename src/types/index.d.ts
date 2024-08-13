import { AxiosResponse } from 'axios';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type ApiFileUploadResponse = {
    payload: {
        url: string
    }
}

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