import React, { useState } from 'react';
import Cards, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

interface CreditCard {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focused?: Focused;
}

export const useCreditCard = () => {
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


interface CreditCardFormProps {
    creditCard: CreditCard;
    handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputFocus: (evt: React.FocusEvent<HTMLInputElement>) => void;
}

const CreditCardForm = (props: CreditCardFormProps ) => {
   

    return (
        <div>
            <Cards
                number={props.creditCard.number}
                name={props.creditCard.name}
                expiry={props.creditCard.expiry}
                cvc={props.creditCard.cvc}
                focused={props.creditCard.focused}
            />
            <form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={props.creditCard.number}
                    onChange={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={props.creditCard.name}
                    onChange={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                />
                <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY Expiry"
                    value={props.creditCard.expiry}
                    onChange={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                />
                <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={props.creditCard.cvc}
                    onChange={props.handleInputChange}
                    onFocus={props.handleInputFocus}
                />
            </form>
        </div>
    );
}

export default CreditCardForm;
