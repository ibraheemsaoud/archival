export interface IRole {
  userId: string;
  eraId: string;
  role: "owner" | "curator" | "member" | "pending" | "banned" | "none";
}
