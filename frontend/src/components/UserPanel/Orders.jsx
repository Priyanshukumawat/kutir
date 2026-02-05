import Table from "../common/Table";
import Card from "../common/Card";

function Orders() {
  const orders = [
    {
      OrderID: "#1001",
      Status: "Delivered",
      Amount: "₹1,200",
    },
    {
      OrderID: "#1002",
      Status: "Shipped",
      Amount: "₹800",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        My Orders
      </h1>

      <Card className="p-0">
        <Table
          columns={["OrderID", "Status", "Amount"]}
          data={orders}
        />
      </Card>
    </>
  );
}

export default Orders;
