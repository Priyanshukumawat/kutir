import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

function VendorSupportAndPolicies() {
  const [ticket, setTicket] = useState("");

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Support & Policies
      </h1>

      {/* Platform rules */}
      <Card className="mb-6">
        <h3 className="font-semibold text-primary mb-2">
          Platform Rules
        </h3>
        <p className="text-sm text-gray-600">
          Vendors must ensure product authenticity, timely shipping,
          and compliance with Kutir quality guidelines.
        </p>
      </Card>

      {/* Commission policy */}
      <Card className="mb-6">
        <h3 className="font-semibold text-primary mb-2">
          Commission Policy
        </h3>
        <p className="text-sm text-gray-600">
          Kutir charges a standard 10% commission on each successful
          order.
        </p>
      </Card>

      {/* Raise support ticket */}
      <Card className="max-w-xl mb-6">
        <h3 className="font-semibold text-primary mb-3">
          Raise Support Ticket
        </h3>

        <Input
          label="Describe your issue"
          placeholder="Facing an issue with..."
          value={ticket}
          onChange={e => setTicket(e.target.value)}
        />

        <Button title="Submit Ticket" />
      </Card>

      {/* Admin notifications */}
      <Card>
        <h3 className="font-semibold text-primary mb-2">
          Admin Notifications
        </h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>New policy update coming next week</li>
          <li>Festival sale registrations open</li>
        </ul>
      </Card>
    </>
  );
}

export default VendorSupportAndPolicies;
