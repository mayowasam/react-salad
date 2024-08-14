import React from "react";
import { Button, Modal } from "antd";
import type { ModalComponentProps } from "../../types";

export function ModalComponent({ isModalOpen, setIsModalOpen, message, href, maskClosable = false }: ModalComponentProps) {

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>

            <Modal
                width={'400px'}
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={maskClosable}
                footer={
                    href ?

                        <Button type="primary" onClick={() => {
                            if (href) {
                                window.location.href = href; // Then navigate to href
                            }
                        }} block size='large'
                        >
                            Ok

                        </Button>

                        :

                        <Button type="primary" onClick={handleOk} block size='large'
                        >
                            Ok
                        </Button>

                }

            >
                <div className='min-h-[200px] flex flex-col justify-center items-center'>
                    {message}
                </div>


            </Modal>
        </>
    );
};