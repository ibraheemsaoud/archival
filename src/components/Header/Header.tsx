import { useMatch } from "react-router-dom";
import { BackButton } from "../BackButton";

interface IHeader {
  title: string;
}
export const Header = ({ title }: IHeader) => {
  const match = useMatch("/");
  const isOnTheHomePage = !!match;
  return (
    <div>
      {!isOnTheHomePage && <BackButton />}
      <h1>{title}</h1>
    </div>
  );
};
