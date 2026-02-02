import React, { useState } from "react";
import Card from "../common/Card";
import Table from "../common/Table";
import Button from "../common/Button";
import Input from "../common/Input";

function VendorReviewsAndRatings() {
  const [reply, setReply] = useState("");

  const reviews = [
    {
      Product: "Handmade Pottery",
      Rating: "⭐⭐⭐⭐⭐",
      Review: "Beautiful craftsmanship!",
      Customer: "Anjali",
    },
    {
      Product: "Khadi Kurta",
      Rating: "⭐⭐⭐⭐",
      Review: "Good quality fabric",
      Customer: "Rahul",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Reviews & Ratings
      </h1>

      {/* Product-wise ratings */}
      <Card className="mb-6">
        <p className="text-sm text-gray-500">Average Rating</p>
        <h2 className="text-xl font-bold text-primary mt-1">
          ⭐ 4.5 / 5
        </h2>
      </Card>

      {/* Customer feedback list */}
      <Card className="p-0 mb-6">
        <Table
          columns={["Product", "Rating", "Review", "Customer"]}
          data={reviews}
        />
      </Card>

      {/* Reply to reviews */}
      <Card className="max-w-xl">
        <h3 className="font-semibold text-primary mb-3">
          Reply to Customer
        </h3>

        <Input
          label="Your Reply"
          placeholder="Thank you for your valuable feedback..."
          value={reply}
          onChange={e => setReply(e.target.value)}
        />

        <Button title="Send Reply" />
      </Card>
    </>
  );
}

export default VendorReviewsAndRatings;
