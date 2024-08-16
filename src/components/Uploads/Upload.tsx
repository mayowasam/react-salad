import React from "react";
import { Image, Upload, message } from "antd";
import type { UploadFile, UploadProps } from 'antd';
import { PlusOutlined, InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import type { FileType, UploadComponentProps } from "../../types";
import { RcFile } from "antd/es/upload";

const { Dragger } = Upload

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export function Uploads({ fileList, setFileList, mutateAsync, form, fileName, previewImage, setPreviewImage, previewOpen, setPreviewOpen, validType = ['image/jpg', 'image/png', 'image/jpeg', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] }: UploadComponentProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadDocument: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await mutateAsync(formData);
            if (response?.data?.payload) {
                form.setFieldsValue({ [fileName]: response?.data?.payload?.url });
                messageApi.success('file successfully uploaded')
                if (onSuccess) {
                    onSuccess(response.data.payload); // Call onSuccess with the response payload
                }
            }

        } catch (error) {
            messageApi.error('Upload failed');
            if (onError) {
                const uploadError = new Error('Upload failed');
                onError(uploadError); // Call onError with the error
            }
        }
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const checkFileSizeLimit = async (file: RcFile): Promise<string | boolean> => {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
            await message.error('Error Document must be smaller than 1MB!');
            return Upload.LIST_IGNORE;
        }
        const isValid = validType.includes(file.type);
        if (!isValid) {
            message.error(`${file.name} is not a valid file`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (

        <>
            {contextHolder}
            <Upload
                listType="picture-card"
                beforeUpload={checkFileSizeLimit}
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                customRequest={uploadDocument}
                onPreview={handlePreview}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt=""
                />
            )}

        </>
    )
}


export function DragUpload({ fileList, setFileList, mutateAsync, form, fileName, previewImage, setPreviewImage, previewOpen, setPreviewOpen, dragAreaText, validType = ['image/jpg', 'image/png', 'image/jpeg', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] }: UploadComponentProps) {
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const uploadDocument: UploadProps['customRequest'] = async ({ file, onError, onSuccess }) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await mutateAsync(formData);
            if (response?.data?.payload) {
                form.setFieldsValue({ [fileName]: response?.data?.payload?.url });
                messageApi.success('file successfully uploaded')
                if (onSuccess) {
                    onSuccess(response.data.payload); // Call onSuccess with the response payload
                }
            }

        } catch (error) {
            messageApi.error('Upload failed');

            if (onError) {
                const uploadError = new Error('Upload failed');
                onError(uploadError); // Call onError with the error
            }
        }
    }

    const checkFileSizeLimit = async (file: RcFile): Promise<string | boolean> => {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
            await message.error('Error Document must be smaller than 1MB!');
            return Upload.LIST_IGNORE;
        }
        const isValid = validType.includes(file.type);
        if (!isValid) {
            message.error(`${file.name} is not a valid file`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return (
        <>
            {contextHolder}
            <Dragger
                listType="picture"
                beforeUpload={checkFileSizeLimit}
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                customRequest={uploadDocument}
                onPreview={handlePreview}
                onDrop={(e) => {
                    console.log('Dropped files', e.dataTransfer.files)
                }
                }
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text text-[#475467]"><span className="font-bold text-saladgreen">Click to upload</span> or drag and drop</p>
                <p className="ant-upload-hint text-[#475467]">{dragAreaText ?? ".png, .jpg, .jpeg, .pdf file upload (max. size 1mb)."}</p>
            </Dragger>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt=""
                />
            )}
        </>
    )
}

export function WidgetDragUpload({ fileList, setFileList, mutateAsync, form, fileName, previewImage, setPreviewImage, previewOpen, setPreviewOpen, dragAreaText, validType = ['image/jpg', 'image/png', 'image/jpeg', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] }: UploadComponentProps) {
    const [messageApi, contextHolder] = message.useMessage();

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const uploadDocument: UploadProps['customRequest'] = async ({ file, onError, onSuccess }) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await mutateAsync(formData);
            if (response?.data?.payload) {
                form.setFieldsValue({ [fileName]: response?.data?.payload?.url });
                messageApi.success('file successfully uploaded')
                if (onSuccess) {
                    onSuccess(response.data.payload); // Call onSuccess with the response payload
                }
            }

        } catch (error) {
            messageApi.error('Upload failed');

            if (onError) {
                const uploadError = new Error('Upload failed');
                onError(uploadError); // Call onError with the error
            }
        }
    }

    const checkFileSizeLimit = async (file: RcFile): Promise<string | boolean> => {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
            await message.error('Error Document must be smaller than 1MB!');
            return Upload.LIST_IGNORE;
        }
        const isValid = validType.includes(file.type);
        if (!isValid) {
            message.error(`${file.name} is not a valid file`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    return (
        <>
            {contextHolder}
            <div className="widgetdrag">
            <Dragger
                listType="picture"
                beforeUpload={checkFileSizeLimit}
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                customRequest={uploadDocument}
                onPreview={handlePreview}
                onDrop={(e) => {
                    console.log('Dropped files', e.dataTransfer.files)
                }
                }
            >

                <div className="flex gap-4">
                    <div className="border-2 w-12 h-14 flex justify-center rounded-lg">
                        <CloudUploadOutlined className="text-2xl"/>
                    </div>
                    <div className="text-left">

                        <p className="ant-upload-text text-[#475467]"><span className="font-bold text-[#6941C6]">Click to upload</span></p>
                        <p className="ant-upload-text text-[#475467]">{dragAreaText ?? ".png, .jpg, .pdf upload (max. size 1mb)."}</p>
                    </div>
                </div>
            </Dragger>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt=""
                />
            )}

            </div>
        </>
    )
}