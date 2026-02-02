import Table from "../common/Table";
import Card from "../common/Card";
import Button from "../common/Button";

function VendorOrders() {
  const orders = [
    {
      OrderID: "#1023",
      Status: "Pending",
      Tracking: "—",
      Invoice: "Download",
      Amount: "₹1,200",
    },
    {
      OrderID: "#1024",
      Status: "Shipped",
      Tracking: "TRACK123",
      Invoice: "Download",
      Amount: "₹800",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Order Management
      </h1>

      <Card className="p-0">
        <Table
          columns={[
            "OrderID",
            "Status",
            "Tracking",
            "Invoice",
            "Amount",
          ]}
          data={orders}
        />
      </Card>

      <Card className="mt-8">
        <p className="text-sm text-gray-600 mb-3">
          Order lifecycle: Pending → Packed → Shipped → Delivered.
          Supports invoice download, shipping tracking, cancellation
          & return handling.
        </p>

        <Button title="Manage Order Policies" />
      </Card>
    </>
  );
}

export default VendorOrders;
