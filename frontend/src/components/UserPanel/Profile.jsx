import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

function Profile() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-primary mb-6">
        My Profile
      </h1>

      <Card className="max-w-xl">
        <Input label="Full Name" placeholder="Your name" />
        <Input label="Email" placeholder="you@email.com" />
        <Input label="Phone Number" placeholder="+91 XXXXXXXX" />

        <Button title="Update Profile" />
      </Card>
    </>
  );
}

export default Profile;
