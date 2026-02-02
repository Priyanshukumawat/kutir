import Card from "../common/Card";
import Button from "../common/Button";

function VendorWallet() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Earnings & Wallet
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm">Total Earnings</p>
          <h2 className="text-xl font-bold">₹45,000</h2>
        </Card>

        <Card>
          <p className="text-sm">Available Balance</p>
          <h2 className="text-xl font-bold">₹6,400</h2>
        </Card>

        <Card>
          <p className="text-sm">Commission</p>
          <h2 className="text-xl font-bold">10%</h2>
        </Card>
      </div>

      <Card className="mt-8">
        <h3 className="font-semibold mb-2">
          Bank & Settlement Details
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Linked bank account • Settlement history available
        </p>
        <Button title="Request Withdrawal" />
      </Card>
    </>
  );
}

export default VendorWallet;
