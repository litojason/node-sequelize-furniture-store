import { PaymentMethodCreationAttributes } from "../../models/paymentMethod.model";

export const PAYMENT_METHODS: PaymentMethodCreationAttributes[] = [
  { name: "Cash", value: "CASH" },
  { name: "Credit Card", value: "CREDIT_CARD" },
].map((paymentMethod) => ({
  ...paymentMethod,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
