import { Firestore, getDocs, collection } from "firebase/firestore";
import { IRole } from "../interfaces/role.interface";

export const requestRoles = async (db: Firestore | null, userId?: string) => {
  if (!userId || !db)
    return {
      data: undefined,
      error: "no id provided",
    };
  const rolesSnapshot = await getDocs(collection(db, "User", userId, "Role"));
  const roles: IRole[] = [];
  rolesSnapshot.forEach((doc) => {
    const data = doc.data();
    roles.push({
      eraId: doc.id.replace(/ /g, ""),
      role: data.role,
      userId: userId,
    });
  });
  return {
    data: roles,
    error: undefined,
  };
};
