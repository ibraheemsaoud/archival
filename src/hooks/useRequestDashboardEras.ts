import { useEffect, useState } from "react";
import { IEra } from "../interfaces/era.interface";
import { requestDashboardEras } from "../requests";

export const useRequestDashboardEras = () => {
  const [eras, setEras] = useState<IEra[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const loadEras = async () => {
    setLoading(true);
    try {
      const { data, error } = await requestDashboardEras();

      if (error) {
        setError(error);
      } else if (data) {
        setEras(data);
      } else {
        setError("No eras found");
      }
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEras();
  }, []);

  return { eras, error, loading };
};
