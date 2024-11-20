'use client'

import React, {  useRef } from "react";
import { useAuthStore } from "@store/auth/auth.store";
import useCheckout from "app/hooks/useCheckout";
import B2BCheckout from "./B2BCheckout";
import { SHIPPING_PAP } from "@repositories/shipping";

export default function CheckoutPage() {
  const {userSession, isLogedIn} = useAuthStore();
  const checkoutData = useCheckout();

  let productsCost = checkoutData.totalAmountWithShipping
  if (checkoutData.shipment.shippingAmount && checkoutData.shipment.shippingAmount > 0) {
    productsCost -= checkoutData.shipment.shippingAmount
  }
  return (
    <section>
      <B2BCheckout
        user={userSession}
        productsCost={productsCost}
        shippingCost={checkoutData.shipment.shippingAmount}
        total={checkoutData.totalAmountWithShipping}
        postalCode={checkoutData.shipment.zipCode}
        shippingType={SHIPPING_PAP}
      />

    </section>
  );
}