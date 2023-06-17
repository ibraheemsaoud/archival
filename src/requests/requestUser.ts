import { doc, getDoc, Firestore } from "firebase/firestore";
import { IExtendedUser } from "../interfaces/extendedUser.interface";

export const requestUser = async (db: Firestore | null, userId?: string) => {
  if (!userId || !db)
    return {
      data: undefined,
      error: "no id provided",
    };
  const userSnapshot = await getDoc(doc(db, "User", userId));
  if (userSnapshot.exists()) {
    return {
      data: {
        username: userSnapshot.data().username,
        admin: userSnapshot.data().admin,
      } as IExtendedUser,
      error: undefined,
    };
  } else {
    return {
      data: undefined,
      error:
        "failed to load user, server might be down or you loaded the incorrect topic",
    };
  }
};
