import React from "react";

function OrderList(props: any) {
  return <ol {...props} style={{ padding: '0px 36px' }} />;
}

function UnOrderList(props: any) {
  return <ul {...props} style={{ padding: '0px 36px' }} />;
}

function OrderListItem(props: any) {
  return <li {...props} style={{ padding: '4px' }} />;
}

export { OrderListItem, OrderList, UnOrderList };
