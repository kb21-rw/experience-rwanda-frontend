export const getNameInitials = (name: string) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];
  const nameInitials =
    firstName.charAt(0).toUpperCase() + lastName?.charAt(0).toUpperCase() ||
    name.charAt(1).toUpperCase();
  return nameInitials;
};
