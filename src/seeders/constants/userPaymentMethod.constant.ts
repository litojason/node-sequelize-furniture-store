import { UserPaymentMethodCreationAttributes } from "../../models/userPaymentMethod.model";

export const USER_PAYMENT_METHODS: UserPaymentMethodCreationAttributes[] = [
  {
    cardNumber: "123412341234",
    expirationDate: "12/28",
    cvc: "123",
    isDefault: false,
    userId: 1,
    paymentMethodId: 2,
  },
].map((userPaymentMethod) => ({
  ...userPaymentMethod,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
