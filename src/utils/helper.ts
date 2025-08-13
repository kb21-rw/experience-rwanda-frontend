export const getNameInitials = (name: string) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1] || firstName;
  const nameInitials =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  return nameInitials;
};
