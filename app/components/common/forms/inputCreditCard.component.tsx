import { CheckoutFormDataProps } from '@pages/checkout/components/contracts';
import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const CreditCardForm = (props: CheckoutFormDataProps) => {
    const {creditCardForm} = props.checkoutData

    return (
        <div>
            <Cards
                number={creditCardForm.creditCard.number}
                name={creditCardForm.creditCard.name}
                expiry={creditCardForm.creditCard.expiry}
                cvc={creditCardForm.creditCard.cvc}
                focused={creditCardForm.creditCard.focused}
            />
            <form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={creditCardForm.creditCard.number}
                    onChange={creditCardForm.handleInputChange}
                    onFocus={creditCardForm.handleInputFocus}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={creditCardForm.creditCard.name}
                    onChange={creditCardForm.handleInputChange}
                    onFocus={creditCardForm.handleInputFocus}
                />
                <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY Expiry"
                    value={creditCardForm.creditCard.expiry}
                    onChange={creditCardForm.handleInputChange}
                    onFocus={creditCardForm.handleInputFocus}
                />
                <input
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={creditCardForm.creditCard.cvc}
                    onChange={creditCardForm.handleInputChange}
                    onFocus={creditCardForm.handleInputFocus}
                />
            </form>
        </div>
    );
}

export default CreditCardForm;
