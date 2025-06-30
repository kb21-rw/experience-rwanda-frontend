import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const InviteAdminPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center font-inter">
      <h1 className="font-bold text-2xl text-center mb-10">Invite New User</h1>
      <div className="px-11 py-21.25 max-w-md mx-auto shadow-md rounded-lg">
        <p className="mb-20 text-lg">
          Invite a new user, will have an admin role after accepting invitation
        </p>
        <form>
          <Input placeholder="Enter email address" />
          <Button variant={"primary"} className="mt-5 w-full">
            Send Invite
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InviteAdminPage;
