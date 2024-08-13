import React from "react";
import axios from "axios";
import type { ModalState } from "../types";

export const formatPhoneNumber = (value: string) => {

    let formattedValue = value;
    if (value.startsWith('0')) {
      formattedValue = '+234' + value.slice(1);
    } else if (!value.startsWith('234')) {
      formattedValue = '+234' + value;
    }
    return formattedValue;
  };

export const changeCurrency = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      // style: 'currency',
      // currency: 'NGN',
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(amount || 0);
  
    return `₦${formattedAmount}`
  
  }
  
  export const handleError = async (error: unknown, updateEvent: React.Dispatch<Partial<ModalState>>) => {
    if (axios.isAxiosError(error)) {
      if (error?.response && error?.response?.data.error?.response?.message?.length > 0) {
        return updateEvent({
          isModalOpen: true,
          href: false,
          message: React.createElement(
            React.Fragment,
            null,
            React.createElement('p', { className: 'font-bold text-xl py-3' }, 'You are unable to proceed'),
            (error?.response?.data.error?.response?.message ?? []).map((item: string[], index: number) =>
              React.createElement('p', { key: index, className: 'text-center text-red-500' }, item)
            )
          ),
        });
      }
      if (error?.response && error?.response?.data) {
        return updateEvent({
          isModalOpen: true,
          href: false,
          message: React.createElement(
            React.Fragment,
            null,
            React.createElement('p', { className: 'font-bold text-xl py-3' }, 'You are unable to proceed'),
            React.createElement('span', {className: 'text-center text-red-500'}, error?.response?.data?.message)
          ),
        });
      }
    } else {
      updateEvent({
        isModalOpen: true,
        href: false,
        message: React.createElement(
          React.Fragment,
          null,
          React.createElement('p', { className: 'font-bold text-xl py-3' }, 'You are unable to proceed'),
          React.createElement('span', {className: 'text-center text-red-500'}, 'An unexpected error occurred. Please try again.')
        ),
      });
  
    }
  };
  