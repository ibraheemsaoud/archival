import { useNavigate, useLocation } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onBack = (defaultRoute: string) => {
    if (location.key) {
      navigate(-1);
    } else {
      navigate(defaultRoute);
    }
  };

  return {
    onBack,
  };
};
