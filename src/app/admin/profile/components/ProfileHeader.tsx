import { Button } from "@/components/ui/Button";
import { Share2 } from "lucide-react";
const rofileHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Users Information
      </h1>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Share2 />
        Invite
      </Button>
    </div>
  );
};

export default rofileHeader;
