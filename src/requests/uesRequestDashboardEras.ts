import { list } from "./useRequestEra";

export const uesRequestDashboardEras = () => {
  // shuffle the list and get the first 6 items
  list.sort(() => Math.random() - 0.5);

  return {
    data: list.slice(0, 6),
    isLoading: false,
    error: undefined,
  };
};
