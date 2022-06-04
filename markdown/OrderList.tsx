import { OrderedList, ListItem } from "@chakra-ui/react";
import React from "react";

function OrderList(props: any) {
  return <OrderedList ml={"48px"} {...props} />;
}

function OrderListItem(props: any) {
  return <ListItem ml={"16px"} mb={"8px"} {...props} />;
}

export default OrderList;
export { OrderListItem };
