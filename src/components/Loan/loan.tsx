import React, { useEffect, useReducer, useState } from 'react';
import  {Uploads , DragUpload } from '../Uploads';
import type { LoanFormComponentProps, RepaymentAction, RepaymentState, RepaymentTableProps } from '../../types';
import { Api } from '../../scripts/endpoints';
import { handler } from '../../scripts/localstorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, InputNumber, Select, Image, Table } from 'antd';
import type { TableProps, UploadFile } from 'antd';
import { changeCurrency, handleError } from '../../scripts/utils'
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import withProviders from '../../scripts/withproviders';
import '../../styles/globals.css'
const { Option } = Select;

const columns: TableProps<RepaymentTableProps>['columns'] = [
    {
        title: 'Payment Date',
        dataIndex: 'repayment_date',
        key: 'repayment_date',
        render: (text) => <p className="text-[#667085]" >{new Date(text).toLocaleDateString()}</p>,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (text) => <p className="font-bold" >{changeCurrency(text)}</p>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => <p className="font-bold" >{text}</p>,

    },
];

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

const Step1 = ({ current, setCurrent }: LoanFormComponentProps) => {
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
            <h1 className='text-black text-2xl font-extrabold pt-6 pb-4 px-6 '>Step 1 of 3</h1>
            <p className='text-[#475467] px-6'>Input Personal Information</p>
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
                        name="firstname"
                        label={<span style={{ fontWeight: "bold" }}>First Name</span>}
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]}
                    >
                        <Input size="large" placeholder="Enter first name" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label={<span style={{ fontWeight: "bold" }}>Last Name</span>}
                        rules={[{ required: true, message: 'Please input your Last Name!', whitespace: true }]}
                    >
                        <Input size="large" placeholder="Enter last name" />
                    </Form.Item>



                    <Form.Item
                        name="email"
                        label={<span style={{ fontWeight: "bold" }}>E-mail</span>}
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

const Step2 = ({ current, setCurrent }: LoanFormComponentProps) => {
    const [form] = Form.useForm();
    const [personalInfromation] = useState(handler('personalInfo'))
    const { data } = useQuery({
        queryFn: Api.fetchBank,
        queryKey: ["fetch banks"],
    })

    const onFinish = async (values: any) => {
        console.log(values);
        try {
            setCurrent(current + 1);

        } catch (error) {
        };
    }

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="Naira">₦</Option>
                <Option value="Pounds">£</Option>
                <Option value="USD">$</Option>
                <Option value="Euro">€</Option>
            </Select>
        </Form.Item>
    );


    const options = (data?.data?.payload ?? []).map((item) => ({
        value: item.code,
        label: item.name,
    }));
    return (
        <div className='bg-white w-[400px] rounded-xl widget'>
            <h1 className='text-black text-2xl font-extrabold pt-6 pb-4 px-6 '>Step 2 of 3</h1>
            <p className='text-[#475467] px-6'>Fill in employment and bank info</p>
            <hr className='bg-[#EAECF0]' />
            <Form
                layout="vertical"
                // {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    ...personalInfromation,
                    employment_date: personalInfromation?.employment_date ? moment(personalInfromation.employment_date) : "",
                    contract_type: personalInfromation?.contract_type,
                    phone: personalInfromation?.phone.slice(4),
                    suffix: "Naira",
                    prefix: '+234'
                }}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <div className='px-6 py-3 widgetform'>

                    <Form.Item
                        name="employer_name"
                        label={<span style={{ fontWeight: "bold" }}>Company Name</span>}
                        tooltip="This is the name of the company where you work for"
                        rules={[{ required: true, message: "Please input your company's Name!", whitespace: true }]}
                    >
                        <Input
                            size="large" placeholder="Enter company's name" />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ fontWeight: "bold" }}
                        >Employment Date</span>}
                        name="employment_date"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker
                            format="YYYY/MM/DD" style={{ width: "100%" }} size="large" placeholder="Select Date" />
                    </Form.Item>


                    <Form.Item
                        name="contract_type"
                        label={<span style={{ fontWeight: "bold" }}>Contract Type</span>}
                        rules={[{ required: true, message: 'Please select Contract type!' }]}
                    >
                        <Select placeholder="select your contract type" size="large"
                        >
                            <Option value="full_time">Full time</Option>
                            <Option value="contract">Contract</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="monthly_income"
                        label={<span style={{ fontWeight: "bold" }}
                        >Monthly Income</span>}
                        rules={[{ required: true, message: 'Please input monthly income!' }]}
                    >

                        <InputNumber
                            addonBefore={suffixSelector}
                            style={{ width: '100%' }}
                            size="large" />
                    </Form.Item>
                    <p className="font-bold  pb-3">Bank details*</p>
                    <Form.Item
                        name="account_number"
                        label={<span style={{ fontWeight: "bold" }}>Account Number</span>}
                        rules={[{ required: true, message: 'Please input Account Number' }]}
                    >
                        <Input size="large" placeholder="Account Number" />
                    </Form.Item>

                    <Form.Item
                        name="bank_code"
                        label={<span style={{ fontWeight: "bold" }}>Bank Name</span>}
                        rules={[{ required: true, message: 'Please select Bank Name!' }]}
                    >


                        <Select
                            showSearch
                            placeholder="select your Bank Name"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            size="large"
                            options={options}
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

const Step3 = ({ current, setCurrent }: LoanFormComponentProps) => {
    const [form] = Form.useForm();
    const [verificationInformation] = useState(handler('verificationInfo'))
    const [selectedItem, setSelectedItem] = useState(verificationInformation?.verification_type ?? "");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [verificationfileList, setverificationFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(verificationInformation?.image_url ?? '');
    const [previewDocOpen, setPreviewDocOpen] = useState(false);
    const [previewDocImage, setPreviewDocImage] = useState(verificationInformation?.verification_url ?? '');

    const { mutateAsync } = useMutation({
        mutationFn: Api.upload,
        mutationKey: ["upload file"],

    })

    const handleSelectChange = (value: string) => {
        setSelectedItem(value);
    };

    const onFinish = async (values: any) => {
        console.log(values);
        try {
            setCurrent(current + 1);

        } catch (error) {
        };
    }

    return (
        <div className='bg-white w-[400px] rounded-xl widget'>
            <h1 className='text-black text-2xl font-extrabold pt-6 pb-4 px-6 '>Step 3 of 3</h1>
            <p className='text-[#475467] px-6'>Fill in details and upload IDs</p>
            <hr className='bg-[#EAECF0]' />
            <Form
                layout="vertical"
                form={form}
                name="verifyInformation"
                onFinish={onFinish}
                initialValues={{
                    // ...verificationInformation,
                    image_url: verificationInformation?.image_url ? verificationInformation?.image_url : "",
                    verification_type: verificationInformation?.verification_type ? verificationInformation?.verification_type : "",
                    verification_url: verificationInformation?.verification_url ? verificationInformation?.verification_url : "",
                    address: verificationInformation?.address ? verificationInformation?.address : "",
                    bvn: verificationInformation?.bvn ? verificationInformation?.bvn : "",
                    suffix: "Naira",
                    prefix: '86'
                }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <div className='px-6 py-3 widgetform'>

                    <Form.Item
                        name="bvn"
                        label={<span style={{ fontWeight: "bold" }}>BVN</span>}
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your BVN!' }]}
                    >
                        <InputNumber size="large" placeholder="Enter BVN" style={{ width: '100%' }} minLength={11} maxLength={11} />
                    </Form.Item>


                    <Form.Item
                        name="address"
                        label={<span style={{ fontWeight: "bold" }}>Address</span>}
                        rules={[
                            { required: true, message: 'Please select your habitual residence!' },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} size="large" placeholder="Enter Address" />
                    </Form.Item>


                    <p className="text font-extrabold pb-1">Upload Identification*</p>

                    <>

                        <div className='p-4  '>
                            {
                                verificationInformation?.image_url &&
                                <Image
                                    width={200}
                                    src={verificationInformation?.image_url}
                                    alt=""
                                />

                            }

                            <Form.Item
                                name="image_url"
                                label={<span style={{ fontWeight: "bold" }}
                                >Picture</span>}
                                rules={[{ required: true, message: 'Please select an item to Upload, and make sure that the file size is less than 1mb!' }]}
                            >

                                <Uploads
                                    fileList={fileList}
                                    fileName='image_url'
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
                        </div>

                        <Form.Item
                            name="verification_type"
                            label={<span style={{ fontWeight: "bold" }}>Select ID</span>}
                            rules={[{ required: true, message: 'Please select item to Upload!' }]}
                        >
                            <Select placeholder="Select your item" size="large" onChange={handleSelectChange} >
                                <Option value="drivers_license">Drivers License</Option>
                                <Option value="international_passport">International Passport</Option>
                                <Option value="voters_card">Voters Card</Option>
                                <Option value="nin">NIN</Option>
                            </Select>
                        </Form.Item>
                        {selectedItem && (
                            <Form.Item
                                name="verification_url"
                                label={<span style={{ fontWeight: "bold" }}>{`Upload ${selectedItem.split('_').join(" ")}`}</span>}
                                rules={[
                                    { required: true, message: 'Please select a valid id!' },
                                ]}
                            >
                                <DragUpload
                                    fileList={verificationfileList}
                                    fileName='verification_url'
                                    form={form}
                                    mutateAsync={mutateAsync}
                                    previewImage={previewDocImage}
                                    previewOpen={previewDocOpen}
                                    setFileList={setverificationFileList}
                                    setPreviewImage={setPreviewDocImage}
                                    setPreviewOpen={setPreviewDocOpen}
                                    validType={['image/jpg', 'image/png', 'image/jpeg', 'application/pdf']}
                                />
                            </Form.Item>


                        )}

                        {
                            verificationInformation?.verification_url &&
                            <Image
                                width={200}
                                src={verificationInformation?.verification_url}
                                alt=""
                            />
                        }
                    </>

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

const LoanComp = () => {
    const [form] = Form.useForm();
    const [event, updateEvent] = useReducer(
        (prev: RepaymentState, next: RepaymentAction): RepaymentState => {
            return {
                ...prev,
                ...next,
            };
        },
        {
            amount: "",
            repayment_period: "",
            isModalOpen: false,
            href: false,
            message: '',

        }
    );
    const { data: minimumloan } = useQuery({
        queryFn: Api.minimumLoan,
        queryKey: ["minimum loan"]

    });

    const { mutate: repaymentDate, isPending: tableIsPending, data } = useMutation({
        mutationFn: Api.repaymentDate,
        mutationKey: ["repayment date"],
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: Api.requestLoan,
        mutationKey: ["request loan"],

    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onValuesChange = (changedValues: any) => {
        // console.log({ allValues });
        if (changedValues.repayment_period) {
            updateEvent({ repayment_period: changedValues.repayment_period });
        }
        if (changedValues.amount) {
            updateEvent({ amount: changedValues.amount });
        }
    };

    const onFinish = async (values: any) => {
        const personalInfo = handler('personalInfo');
        const verificationInfo = handler('verificationInfo')
        try {
            const data = {
                repayment_period: +values.repayment_period,
                amount: values.amount,
                statement_url: values.statement_url ?? "",
                email: personalInfo.email,
                phone: personalInfo.phone,
                firstname: personalInfo.firstname,
                lastname: personalInfo.lastname,
                address: verificationInfo.address,
                employer_name: personalInfo.employer_name,
                employment_date: personalInfo.employment_date,
                contract_type: personalInfo.contract_type,
                monthly_income: personalInfo.monthly_income,
                account_number: personalInfo.account_number,
                bank_code: personalInfo.bank_code,
                bvn: verificationInfo.bvn,
                bank_name: personalInfo.bank_name,
                verification_type: verificationInfo.verification_type,
                image_url: verificationInfo.image_url,
                verification_url: verificationInfo.verification_url,
                loan_type: 'salad_loan'
            }
            const response = await mutateAsync(data)

            if (response?.data?.payload) {
                updateEvent({
                    isModalOpen: true,
                    href: true,
                    message: <>
                        <p className='font-bold text-xl py-3'>Loan Request Acknowledged </p>
                        <span className=''>Your loan request is acknowledged, We will get back to you.</span>
                    </>
                });
                localStorage.clear();
            }
        } catch (error) {
            await handleError(error, updateEvent)
        }
    };

    useEffect(() => {
        if (event.amount && event.repayment_period) {
            if (event.amount >= process.env.NEXT_PUBLIC_MINIMUMLOWLOAN! && event.amount <= process.env.NEXT_PUBLIC_MINIMUMHIGHLOAN!) {
                form.setFieldValue('repayment_period', 1)
                updateEvent({ repayment_period: "1" });
                repaymentDate(
                    {
                        amount: +event.amount,
                        repayment_period: 1,
                    },
                )
            } else {
                repaymentDate(
                    {
                        amount: +event.amount,
                        repayment_period: +event.repayment_period,
                    },
                )
            }

        }
    }, [event.repayment_period, event.amount, repaymentDate, form])

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="Naira">₦</Option>
                <Option value="Pounds">£</Option>
                <Option value="USD">$</Option>
                <Option value="Euro">€</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className='bg-white w-[400px] rounded-xl widget'>
            <h1 className='text-black text-2xl font-extrabold pt-6 pb-4 px-6 '>Loan Details</h1>

            <hr className='bg-[#EAECF0]' />
            <Form
                layout="vertical"
                // {...formItemLayout}
                form={form}
                name="loanInformation"
                onValuesChange={onValuesChange}
                onFinish={onFinish}
                initialValues={{ suffix: "Naira" }}
                style={{ width: "100%" }}
                scrollToFirstError
            >
                <div className='px-6 py-3 widgetform'>

                    <Form.Item
                        name="amount"
                        label={<span style={{ fontWeight: "bold" }}>Loan amount</span>}
                        rules={[{ required: true, message: 'Please input Loan Amount!' }]}
                    >
                        <InputNumber min={minimumloan?.data?.payload?.min_amount ?? process.env.NEXT_PUBLIC_MINIMUMLOWLOAN} addonBefore={suffixSelector} style={{ width: '100%' }} size="large" placeholder="minimum of 10,000" />
                    </Form.Item>
                    <Form.Item
                        name="repayment_period"
                        label={<span style={{ fontWeight: 'bold' }}>Loan Tenure</span>}
                        rules={[{ required: true, message: 'Please select Loan Tenure!' }]}
                    >
                        <Select
                            placeholder="select your Loan tenure"
                            size="large"
                            disabled={form.getFieldValue('amount') === undefined}
                        >
                            {form.getFieldValue('amount') >= process.env.NEXT_PUBLIC_MINIMUMLOWLOAN! && form.getFieldValue('amount') <= process.env.NEXT_PUBLIC_MINIMUMHIGHLOAN! ? (
                                <Option value={1}>1 month</Option>
                            ) : (
                                [...Array(12)].map((_, index) => (
                                    <Option key={index} value={index + 1}>
                                        {index + 1} {index === 0 ? 'month' : 'months'}
                                    </Option>
                                ))
                            )}
                        </Select>
                    </Form.Item>


                    <p className="font-bold py-3">Repayment details*</p>
                    <div className='pb-8 overflow-auto h-[250px]'>
                        <div className="bg-[#F1F8F6] md:p-4">
                            <div className="p-4 text-center">
                                <p className="font-bold">Repayment Schedule</p>

                            </div>
                            <div>
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    loading={tableIsPending}
                                    dataSource={(data?.data?.payload ??
                                        []).map((item, index) => ({
                                            ...item,
                                            key: String(index),
                                            status: "pending"
                                        }))} />
                            </div>
                        </div>


                    </div>

                    <div className="font-extrabold text-center py-3 ">
                        <a target='_blank' href={process.env.NEXT_PUBLIC_LOAN_AGREEMENT}><DownloadOutlined color='primary' className='font-extrabold text-xl' />{' '} Download Loan Agreement</a>

                    </div>



                    <Form.Item>
                        <div className="flex justify-center pt-4">
                            <Button style={{ background: "#007D2D", color: "#fff", fontWeight: "bolder" }} block htmlType="submit" size="large" loading={isPending}>
                                Submit
                            </Button>

                        </div>
                    </Form.Item>

                </div>
            </Form>
        </div>
    )
}

function Loan() {
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            content: <Phone current={current} setCurrent={setCurrent} />,
        },
        {
            content: <Otp current={current} setCurrent={setCurrent} />,
        },
        {
            content: <Step1 current={current} setCurrent={setCurrent} />,
        },
        {
            content: <Step2 current={current} setCurrent={setCurrent} />,
        },
        {
            content: <Step3 current={current} setCurrent={setCurrent} />,
        },
        {
            content: <LoanComp />,
        },
    ];

    return (
        <section className="bg-[#101828] text-white max-w-full min-h-screen flex items-center justify-center py-4">
            <div>{steps[current].content}</div>

        </section>
    )
}

export default withProviders(Loan)