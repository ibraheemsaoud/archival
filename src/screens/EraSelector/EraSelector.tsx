import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { BackButton } from "../../components";

export const EraSelector = () => {
  const { eras } = useLoaderData() as any as { eras: IEra[] };

  return (
    <div>
      <BackButton />
      <h1>EraSelector</h1>
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
