import Card from "../common/Card";
import Button from "../common/Button";

function Addresses() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Saved Addresses
      </h1>

      <Card>
        <p className="font-medium">Home</p>
        <p className="text-sm text-gray-600">
          Jaipur, Rajasthan – 302001
        </p>

        <Button title="Add New Address" className="mt-4" />
      </Card>
    </>
  );
}

export default Addresses;
