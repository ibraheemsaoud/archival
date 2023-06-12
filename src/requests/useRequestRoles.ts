import { IRole } from "../interfaces/role.interface";

const list: IRole[] = [
  {
    id: "1",
    userId: "1",
    eraId: "1",
    role: "owner",
    createdAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    userId: "1",
    eraId: "2",
    role: "owner",
    createdAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    userId: "1",
    eraId: "3",
    role: "curator",
    createdAt: "2021-01-01T00:00:00.000Z",
  },
];
export const useRequestRoles = () => {
  return {
    data: list,
    isLoading: false,
    error: null,
  };
};
