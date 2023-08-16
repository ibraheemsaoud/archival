import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const onBack = (defaultRoute?: string) => {
    if (defaultRoute) {
      navigate(defaultRoute);
    } else {
      navigate(-1);
    }
  };

  return {
    onBack,
  };
};
