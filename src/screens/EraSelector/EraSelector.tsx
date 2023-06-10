import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { Header } from "../../components";

export const EraSelector = () => {
  const { eras } = useLoaderData() as any as { eras: IEra[] };

  return (
    <div>
      <Header title="EraSelector" />
      <ul>
        {eras?.map((era) => (
          <li key={era.id}>
            <Link to={`/era/${era.id}`}>{era.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
