import {
  OrderStatusCreationAttributes,
  OrderStatuses,
} from "../../models/orderStatus.model";

const orderStatuses = Object.entries(OrderStatuses).map(([key, value]) => ({
  name: value,
  value: key,
}));

export const ORDER_STATUSES: OrderStatusCreationAttributes[] =
  orderStatuses.map((paymentMethod) => ({
    ...paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
