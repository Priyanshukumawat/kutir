import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

function VendorProfile() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Store & Profile Settings
      </h1>

      <Card className="max-w-xl">
        <Input label="Store Name" placeholder="Kutir Crafts" />
        <Input label="Store Logo URL" placeholder="Upload logo" />
        <Input label="Store Banner URL" placeholder="Upload banner" />
        <Input label="Pickup Address" placeholder="Jaipur, Rajasthan" />
        <Input label="Artisan / Brand Story" placeholder="About your craft" />
        <Input label="Contact Number" placeholder="+91 XXXXXXXX" />
        <Input label="Change Password" type="password" />

        <Button title="Save Changes" />
      </Card>
    </>
  );
}

export default VendorProfile;
