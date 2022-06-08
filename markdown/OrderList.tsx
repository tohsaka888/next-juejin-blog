import React from "react";

function OrderList(props: any) {
  return <ol {...props} style={{ padding: '0px 8px' }} />;
}

function UnOrderList(props: any) {
  return <ul {...props} style={{ padding: '0px 8px' }} />;
}

function OrderListItem(props: any) {
  return <li {...props} style={{ padding: '4px' }} />;
}

export { OrderListItem, OrderList, UnOrderList };
