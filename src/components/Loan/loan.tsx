import React, { useState } from 'react';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import type { Bank } from '../../types';
import withProviders from '../../scripts/withproviders';

const { Option } = Select;


function Loan() {
    const [form] = Form.useForm();
    const [data, setData] = useState<Bank[]>([])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        console.log(values)
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 24,
                offset: 0,
            },
        },
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="+234">+234</Option>
                <Option value="+233">+233</Option>
                <Option value="+441">+441</Option>
            </Select>
        </Form.Item>
    );

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

    const options = (data ?? []).map((item) => ({
        value: item.code,
        label: item.name,
    }));
    return (

        <Form
            layout="vertical"
            // {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            // onValuesChange={onValuesChange}
            initialValues={{
                suffix: "Naira",
                prefix: '+234'
            }}
            style={{ width: "100%" }}
            scrollToFirstError
        >
            <p className="text-xl font-bold  pb-3">Personal Information*</p>

            <Row gutter={{ sm: 16 }}>
                <Col xs={24} sm={12} >
                    <Form.Item
                        name="firstname"
                        label={<span style={{ fontWeight: "bold" }}>First Name</span>}
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your First Name!', whitespace: true }]}
                    >
                        <Input
                            size="large"
                            placeholder="Enter first name"
                            style={{ width: "100%" }} />
                    </Form.Item>


                    <Form.Item
                        name="phone"
                        label={<span style={{ fontWeight: "bold" }}>Phone Number</span>}
                        rules={[
                            { required: true, message: 'Please input your phone number!' },

                        ]}                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large" placeholder="Enter phone number" maxLength={11}
                        />
                    </Form.Item>

                </Col>

                <Col xs={24} sm={12} >


                    <Form.Item
                        name="lastname"
                        label={<span style={{ fontWeight: "bold" }}>Last Name</span>}
                        rules={[{ required: true, message: 'Please input your Last Name!', whitespace: true }]}
                    >
                        <Input size="large" placeholder="Enter last name"
                        />
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
                        <Input size="large" placeholder="Enter email address"
                        />
                    </Form.Item>

                </Col>

            </Row>

            <p className="text-xl font-bold  pb-3">Employment Information*</p>
            <Row gutter={{ sm: 16 }}>
                <Col xs={24} sm={12} >

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

                </Col>
                <Col xs={24} sm={12} >

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
                </Col>
            </Row>

            <p className="text-xl font-bold  pb-3">Bank details*</p>
            <Row gutter={{ sm: 16 }}>
                <Col xs={24} sm={12} >
                    <Form.Item
                        name="account_number"
                        label={<span style={{ fontWeight: "bold" }}>Account Number</span>}
                        rules={[{ required: true, message: 'Please input Account Number' }]}
                    >
                        <Input size="large" placeholder="Account Number"
                        />
                    </Form.Item>

                </Col>
                <Col xs={24} sm={12} >
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

                </Col>
                <Col xs={24} sm={12} >
                    <Form.Item
                        name="AccountName"
                        // validateStatus={event.accountStatus}
                        hasFeedback
                        label={<span style={{ fontWeight: "bold" }}>Account Name</span>}
                        rules={[{ required: true, message: 'Please select Bank and an Account Number!' }]}
                    >
                        <Input readOnly size="large" placeholder="Account Name" />

                    </Form.Item>

                </Col>
            </Row>


            <Form.Item {...tailFormItemLayout}>
                <div className="flex justify-end">
                    <Button style={{ background: "#131313", color: "#FFF" }} htmlType="submit" size="large">
                        Continue
                    </Button>

                </div>
            </Form.Item>
        </Form>
    )
}

export default withProviders(Loan)