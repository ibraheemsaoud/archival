import React from "react";
import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";

export const Era = () => {
  const { era } = useLoaderData() as any as { era: IEra };
  if (!era) return <div>Not found</div>;
  return (
    <div>
      <h1>{era.title}</h1>
      <p>{era.description}</p>
    </div>
  );
};
