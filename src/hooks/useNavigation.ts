import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const onBack = (defaultRoute: string) => {
    if (window.history?.length) {
      navigate(-1);
    } else {
      navigate(defaultRoute);
    }
  };

  return {
    onBack,
  };
};
