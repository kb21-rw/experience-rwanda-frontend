import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { IoShareSocial } from "react-icons/io5";

const Users = () => {
  return (
    <section className="p-6 xl:p-10 font-inter">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-inter font-semibold">
          Update User Information
        </h1>
        <Button variant="primary">
          <IoShareSocial />
          Invite
        </Button>
      </div>
      <div className="border border-gray-200 h-screen p-[45px] rounded-lg">
        <div className="mb-[30px]">
          <h4 className="text-xl font-semibold"> Personal Information</h4>
          <p className="text-sm">Update your personal details</p>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-x-20 gap-y-6">
            <div>
              <Label>Email</Label>
              <Input placeholder="experiencerw@gmail.com" />
            </div>
            <div>
              <Label>FullName</Label>
              <Input placeholder="Adeline A" />
            </div>
            <div>
              <Label>Password </Label>
              <Input placeholder="********" />
            </div>
            <div>
              <Label>Confirm Password </Label>
              <Input placeholder="********" />
            </div>
          </div>
          <div className="pt-28 text-center flex justify-center items-center">
            <Button variant="primary" className="w-1/4">
              Update
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Users;
