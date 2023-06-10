export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: "admin" | "user" | "curator";
}
