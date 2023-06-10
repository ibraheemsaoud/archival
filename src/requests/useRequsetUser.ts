import { IUser } from "../interfaces/user.interface";

const list: IUser[] = [
  {
    id: "1",
    firstName: "Ibraheem",
    lastName: "Saoud",
    email: "test",
    userType: "admin",
  },
  {
    id: "2",
    firstName: "Ibraheem",
    lastName: "Saoud",
    email: "test",
    userType: "user",
  },
];
export const useRequsetUser = () => {
  return {
    data: list[0],
  };
};
