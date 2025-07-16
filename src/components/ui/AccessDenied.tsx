import { ShieldAlert } from "lucide-react";

import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { useRouter } from "next/navigation";

const AccessDenied = () => {
  const router = useRouter();
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardContent className="p-6 space-y-4">
          <Alert className="text-black border-black" variant="destructive">
            <ShieldAlert color="black" className="h-5 w-5" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to view this page. Please contact your
              administrator if you believe this is a mistake.
            </AlertDescription>
          </Alert>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/admin")}
          >
            Go to the main page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDenied;
