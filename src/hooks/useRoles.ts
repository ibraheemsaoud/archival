import { useRequestRoles } from "../requests";

export const useRoles = (EraId: string) => {
  const { data: roles, isLoading } = useRequestRoles();
  const eraRole = roles?.find((role) => role.eraId === EraId);
  return {
    isLoading,
    hasAccess:
      eraRole?.role === "owner" ||
      eraRole?.role === "admin" ||
      eraRole?.role === "curator",
    isAdmin: eraRole?.role === "admin",
    isOwner: eraRole?.role === "owner",
    isCurator: eraRole?.role === "curator",
    isMember: eraRole?.role === "member",
    isPending: eraRole?.role === "pending",
    isBanned: eraRole?.role === "banned",
    isNone: eraRole?.role === "none",
  };
};
