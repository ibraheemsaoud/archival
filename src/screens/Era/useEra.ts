import { toast } from "react-hot-toast";
import {
  useRequestEra,
  useRequestUpdateEra,
} from "../../requests/useRequestEra";

export const useEra = (eraId?: string) => {
  const { data, isLoading, error } = useRequestEra(eraId);

  const { mutate, error: updateError, isSuccess } = useRequestUpdateEra();

  if (error || updateError)
    toast.error((error as string) || (updateError as string));

  return {
    era: data,
    isLoading,
    error,
    updateEra: mutate,
    isUpdated: isSuccess,
  };
};
