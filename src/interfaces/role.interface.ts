export interface IRole {
  id: string;
  userId: string;
  eraId: string;
  role:
    | "owner"
    | "admin"
    | "curator"
    | "member"
    | "pending"
    | "banned"
    | "none";
  createdAt: string;
  
}
