import React, { useState }  from "react"
import withProviders from "../../scripts/withproviders"
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Select } from 'antd';
import { DragUpload } from "../Uploads";
import type { UploadFile } from 'antd';
import type { LoanFormComponentProps } from "../../types";
import { Api } from "../../scripts/endpoints";

const { Option } = Select;

const Phone = ({ current, setCurrent }: LoanFormComponentProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log({ values });

        try {
            setCurrent(current + 1);
        } catch (error) {
        };
    }
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="+234">+234</Option>
                <Option value="+233">+233</Option>
                <Option value="+441">+441</Option>
            </Select>
        </Form.Item>
    );
    return (
        <div className='bg-white w-[400px] h-[267px] rounded-xl'>
            <h1 className='text-black text-2xl font-extrabold py-6 pb-4 px-6 '>Getting Started</h1>
            <hr className='bg-[#EAECF0]' />
            <Form
                layout="vertical"
                // {...formItemLayout}
                form={form}
                name="individualloan"
                onFinish={onFinish}
                initialValues={{
                    residence: 'hangzhou',
                    suffix: "Naira",
                    prefix: '+234'
                }}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <div className='p-6'>
                    <Form.Item
                        name="phone"
                        label={<span style={{ fontWeight: "bold" }}>Phone Number</span>}
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large" placeholder="Enter phone number" maxLength={11}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-center pt-4">
                            <Button style={{ background: "#007D2D", color: "#fff", fontWeight: "bolder" }} block htmlType="submit" size="large" >
                                Continue
                            </Button>

                        </div>
                    </Form.Item>

                </div>
            </Form>
        </div>
    )
}

const Otp = ({ current, setCurrent }: LoanFormComponentProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log(values);

        try {
            setCurrent(current + 1);

        } catch (error) {
        };
    }
    return (
        <div className='bg-white w-[400px]  rounded-xl'>
            <h1 className='text-black text-2xl font-extrabold py-6 pb-4 px-6 '>OTP Verification</h1>
            <hr className='bg-[#EAECF0]' />
            <p className='text-black p-6 font-medium'>An OTP has been sent to this phone number +234*******78.</p>
            <Form
                layout="vertical"
                // {...formItemLayout}
                form={form}
                name="individualloan"
                onFinish={onFinish}
                initialValues={{
                    residence: 'hangzhou',
                    suffix: "Naira",
                    prefix: '+234'
                }}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <div className='p-6'>
                    <Form.Item
                        hasFeedback
                        validateStatus="success">
                        <Input.OTP size='large' />
                    </Form.Item>

                    <p className='text-center'> Didn’t get any code? <a href="" className='text-[#F79809]'>00:56</a></p>

                    <Form.Item>
                        <div className="flex justify-center pt-4">
                            <Button style={{ background: "#007D2D", color: "#fff", fontWeight: "bolder" }} block htmlType="submit" size="large" >
                                Continue
                            </Button>

                        </div>
                    </Form.Item>

                </div>
            </Form>
        </div>
    )
}

const CompanyDetails = ({ current, setCurrent }: LoanFormComponentProps) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log(values);

        try {
            setCurrent(current + 1);

        } catch (error) {
        };
    }
    return (
        <div className='bg-white w-[400px]  rounded-xl'>
            <h1 className='text-black text-2xl font-extrabold pt-6 pb-4 px-6 '>Company Details</h1>
            <hr className='bg-[#EAECF0]' />
            <Form
                layout="vertical"
                // {...formItemLayout}
                form={form}
                name="invoice"
                onFinish={onFinish}
                initialValues={{
                    suffix: "Naira",
                    prefix: '+234'
                }}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <div className='p-6'>
                    <Form.Item
                        name="company_name"
                        label={<span style={{ fontWeight: "bold" }}>Company Name</span>}
                        rules={[{ required: true, message: 'Please select your Company Name!' }]}
                    >
                        <Input style={{ width: '100%' }} size="large" placeholder="Enter  Company Name" />

                    </Form.Item>


                    <Form.Item
                        name="address"
                        label={<span style={{ fontWeight: "bold" }}>Address</span>}
                        rules={[
                            { required: true, message: 'Please select your habitual residence!' },
                        ]}
                    >
                        <Input style={{ width: '100%' }} size="large" placeholder="Enter Address" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<span style={{ fontWeight: "bold" }}>E-mail Address</span>}
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter email address" />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-center pt-4">
                            <Button style={{ background: "#007D2D", color: "#fff", fontWeight: "bolder" }} block htmlType="submit" size="large" >
                                Continue
                            </Button>

                        </div>
                    </Form.Item>

                </div>
            </Form>
        </div>
    )
}

const DocumentUpload = ({ current, setCurrent }: LoanFormComponentProps) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [invoiceList, setInvoiceList] = useState<UploadFile[]>([]);
    const [cacList, setCacList] = useState<UploadFile[]>([]);
    const [directorList, setDirectorList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewDocOpen, setPreviewDocOpen] = useState(false);
    const [previewDocImage, setPreviewDocImage] = useState('');
    const [previewCacOpen, setPreviewCacOpen] = useState(false);
    const [previewCacImage, setPreviewCacImage] = useState('');
    const [previewDirOpen, setPreviewDirOpen] = useState(false);
    const [previewDirImage, setPreviewDirImage] = useState('');


    const { mutateAsync } = useMutation({
        mutationFn: Api.upload,
        mutationKey: ["upload file"],

    })

    const { mutateAsync: mutateInvoice, isPending } = useMutation({
        mutationFn: Api.requestInvoice,
        mutationKey: ["request invoice"],

    })


    const onFinish = async (values: any) => {
        console.log(values);
        console.log(mutateInvoice);
        
        try {
            setCurrent(current + 1);

        } catch (error) {
        };
    }


    return (
        <div className='bg-white w-[400px] rounded-xl widget'>
            <h1 className='text-black text-2xl font-extrabold pt-6 pb-4 px-6 '>Document Upload</h1>
            <hr className='bg-[#EAECF0]' />
            <Form
                layout="vertical"
                // {...formItemLayout}
                form={form}
                name="invoice"
                onFinish={onFinish}
                initialValues={{
                    suffix: "Naira",
                    prefix: '+234'
                }}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <div className='px-6 py-3 widgetform'>

                    <Form.Item
                        name='purchase_order_url'
                        tooltip="This can also be any other supporting documents for product or service delivery"
                        label={<span style={{ fontWeight: "bold" }}>Purchase Order Document*</span>}
                        rules={[
                            { required: true, message: 'Please select your purchase receipt!' },
                        ]}
                    >
                        <DragUpload
                            fileList={fileList}
                            fileName='purchase_order_url'
                            form={form}
                            mutateAsync={mutateAsync}
                            previewImage={previewImage}
                            previewOpen={previewOpen}
                            setFileList={setFileList}
                            setPreviewImage={setPreviewImage}
                            setPreviewOpen={setPreviewOpen}
                            validType={['image/jpg', 'image/png', 'image/jpeg', 'application/pdf']}
                        />
                    </Form.Item>

                    <Form.Item
                        name='invoice_url'
                        label={<span style={{ fontWeight: "bold" }}>Invoice Upload</span>}
                        rules={[
                            { required: true, message: 'Please your invoice image!' },
                        ]}
                    >
                        <DragUpload
                            fileList={invoiceList}
                            fileName='invoice_url'
                            form={form}
                            mutateAsync={mutateAsync}
                            previewImage={previewDocImage}
                            previewOpen={previewDocOpen}
                            setFileList={setInvoiceList}
                            setPreviewImage={setPreviewDocImage}
                            setPreviewOpen={setPreviewDocOpen}
                            validType={['image/jpg', 'image/png', 'image/jpeg', 'application/pdf']}
                        />
                    </Form.Item>

                    <Form.Item
                        name='cac_url'
                        label={<span style={{ fontWeight: "bold" }}>CAC Document*</span>}
                        rules={[
                            { required: true, message: 'Please select your CAC Document!' },
                        ]}
                    >
                        <DragUpload
                            fileList={cacList}
                            fileName='cac_url'
                            form={form}
                            mutateAsync={mutateAsync}
                            previewImage={previewCacImage}
                            previewOpen={previewCacOpen}
                            setFileList={setCacList}
                            setPreviewImage={setPreviewCacImage}
                            setPreviewOpen={setPreviewCacOpen}
                            validType={['image/jpg', 'image/png', 'image/jpeg', 'application/pdf']}
                        />
                    </Form.Item>

                    <Form.Item
                        name='directors_image_url'
                        label={<span style={{ fontWeight: "bold" }}>Board of Directors ID*</span>}
                        rules={[
                            { required: true, message: 'Please your Board of Directors ID!' },
                        ]}
                    >
                        <DragUpload
                            fileList={directorList}
                            fileName='directors_image_url'
                            form={form}
                            mutateAsync={mutateAsync}
                            previewImage={previewDirImage}
                            previewOpen={previewDirOpen}
                            setFileList={setDirectorList}
                            setPreviewImage={setPreviewDirImage}
                            setPreviewOpen={setPreviewDirOpen}
                            validType={['image/jpg', 'image/png', 'image/jpeg', 'application/pdf']}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="flex justify-center pt-4">
                            <Button style={{ background: "#007D2D", color: "#fff", fontWeight: "bolder" }} block htmlType="submit" size="large" loading={isPending} >
                                Continue
                            </Button>

                        </div>
                    </Form.Item>

                </div>
            </Form>
        </div>
    )
}



function Invoice() {
    const [current, setCurrent] = useState(2);

    const steps = [
        {
            content: <Phone current={current} setCurrent={setCurrent} />,
        },
        {
            content: <Otp current={current} setCurrent={setCurrent} />,
        },
        {
            content: <CompanyDetails current={current} setCurrent={setCurrent} />,
        },
        {
            content: <DocumentUpload current={current} setCurrent={setCurrent} />,
        },
    ];

    return (
        <section className="bg-[#101828] text-white max-w-full min-h-screen flex items-center justify-center py-4">
            <div>{steps[current].content}</div>

        </section>
    )
}

export default withProviders(Invoice)
