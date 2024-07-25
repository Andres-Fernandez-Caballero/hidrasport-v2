import React, { useState } from 'react';
import { Focused } from 'react-credit-cards-2';
import { CreditCard, IUseCreditCardForm } from './contracts';


export const useCreditCardForm = (): IUseCreditCardForm => {
    const [creditCard, setCreditCard] = useState<CreditCard>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focused: ''
    });

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setCreditCard((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        setCreditCard((prev) => ({ ...prev, focused: evt.target.name as Focused }));
    }

    return {
        creditCard,
        handleInputChange,
        handleInputFocus
    };
}