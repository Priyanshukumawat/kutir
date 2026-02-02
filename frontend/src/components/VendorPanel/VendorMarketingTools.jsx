import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";

function VendorMarketingTools() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Marketing Tools
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Coupons */}
        <Card>
          <h3 className="font-semibold mb-2">Coupons</h3>
          <p className="text-sm text-gray-600 mb-3">
            Create discount coupons for your products.
          </p>
          <Button title="Create Coupon" />
        </Card>

        {/* Offers */}
        <Card>
          <h3 className="font-semibold mb-2">Offers</h3>
          <p className="text-sm text-gray-600 mb-3">
            Run limited-time offers to boost sales.
          </p>
          <Button title="Create Offer" />
        </Card>

        {/* Featured products */}
        <Card>
          <h3 className="font-semibold mb-2">Featured Products</h3>
          <p className="text-sm text-gray-600 mb-3">
            Highlight selected products on Kutir home.
          </p>
          <Button title="Request Feature" />
        </Card>

        {/* Festival campaigns */}
        <Card>
          <h3 className="font-semibold mb-2">
            Festival Campaigns
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Participate in Diwali & local mela campaigns.
          </p>
          <Button title="Join Campaign" />
        </Card>
      </div>
    </>
  );
}

export default VendorMarketingTools;
