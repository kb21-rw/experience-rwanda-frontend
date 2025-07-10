import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/context/authContext";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Profile } from "@/types/Admin";
import { formatISO9075 } from "date-fns";
import ProfileSkeleton from "./ProfileSkeleton";

const PersonalInformation = () => {
  const { token } = useAuth();
  const {
    data: profile,
    error,
    isLoading,
  } = useSWR<Profile>(
    token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/admins/profile/me`, token]
      : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) return <ProfileSkeleton />;
  if (error)
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  if (!profile) return null;
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Account Information */}
        <div>
          <h3 className="text-lg font-medium text-card-foreground">
            Account Information
          </h3>
          <div className="py-8">
            <hr />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-base font-semibold ">Name</label>
                <p className="text-sm text-card-foreground mt-1">
                  {profile.name}
                </p>
              </div>
              <div>
                <label className="text-base font-semibold">Email</label>
                <p className="text-sm text-card-foreground mt-1">
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-base font-semibold">Role</label>
                <p className="text-sm text-card-foreground mt-1">
                  {profile.role.replace("_", " ").toUpperCase()}
                </p>
              </div>
              <div>
                <label className="text-base font-semibold">Created date</label>
                <p className="text-sm text-card-foreground mt-1">
                  {formatISO9075(profile.createdAt, { representation: "date" })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8">
          <hr />
        </div>
        {/* Update Profile Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-card-foreground mb-4">
            Update Profile
          </h3>
          <p className="text-muted-foreground mb-6">
            Want to update your profile? Click the button below to change update
            your profile information and change password.
          </p>
          <Button
            size="lg"
            className="bg-primary text-base font-medium text-primary-foreground hover:bg-primary/90 px-16 py-4 self-center"
          >
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
