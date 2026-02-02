import { useState } from "react";
import Table from "../common/Table";
import Pagination from "../common/Pagination";
import Button from "../common/Button";
import Card from "../common/Card";
import { useNavigate } from "react-router-dom";


function VendorProducts() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const products = [
    {
      Name: "Handmade Pottery",
      Price: "₹800",
      Stock: "12",
      Discount: "10%",
      GST: "5%",
      Status: "Active",
    },
    {
      Name: "Khadi Kurta",
      Price: "₹1,200",
      Stock: "5",
      Discount: "—",
      GST: "5%",
      Status: "Low Stock",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">
          Product Management
        </h1>
        <Button
          title="Add New Product"
          className="w-auto px-6"
          onClick={() => navigate("add")}
        />
      </div>

      {/* Products Table */}
      <Card className="p-0">
        <Table
          columns={[
            "Name",
            "Price",
            "Stock",
            "Discount",
            "GST",
            "Status",
          ]}
          data={products}
        />
      </Card>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={3}
        onPageChange={setPage}
      />

      {/* Feature notes */}
      <Card className="mt-8">
        <p className="text-sm text-gray-600">
          Supports: Edit / Update product, Preview listing, Stock
          management, Multiple image upload, Price, Discount & GST
          configuration.
        </p>
      </Card>
    </>
  );
}

export default VendorProducts;
