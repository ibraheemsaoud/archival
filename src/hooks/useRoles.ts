import { useEffect, useState } from "react";
import { requestRoles, requestUser } from "../requests";
import { useFirebase } from "./useFirebase";
import { IRole } from "../interfaces/role.interface";
import { IExtendedUser } from "../interfaces/extendedUser.interface";

export const useRoles = (eraId?: string) => {
  const [extendedUser, setExtendedUser] = useState<IExtendedUser | undefined>(
    undefined
  );
  const [roles, setRoles] = useState<IRole[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { db, user } = useFirebase();

  useEffect(() => {
    const getRoles = async () => {
      const { data: roles, error } = await requestRoles(db, user?.uid);
      const { data: extendedUser, error: userError } = await requestUser(
        db,
        user?.uid
      );
      setExtendedUser(extendedUser);
      setError(error || userError);
      setRoles(roles);
    };
    getRoles();
  }, [eraId, db, user?.uid]);

  const eraRole = roles?.find((role) => role.eraId === eraId);
  return {
    error,
    extendedUser,
    hasEditAccess:
      !!extendedUser?.admin ||
      eraRole?.role === "owner" ||
      eraRole?.role === "curator",
    isAdmin: !!extendedUser?.admin,
    isOwner: eraRole?.role === "owner",
    isCurator: eraRole?.role === "curator",
    isMember: eraRole?.role === "member",
    isPending: eraRole?.role === "pending",
    isBanned: eraRole?.role === "banned",
    isNone: eraRole?.role === "none",
  };
};
