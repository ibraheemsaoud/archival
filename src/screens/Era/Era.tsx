import React from "react";
import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { IEntery } from "../../interfaces/entery.interface";

export const Era = () => {
  const { era, entries } = useLoaderData() as any as {
    era: IEra;
    entries: IEntery[];
  };
  if (!era) return <div>Not found</div>;
  if (!entries) return <div>Loading...</div>;
  return (
    <div>
      <h1>{era.title}</h1>
      <p>{era.description}</p>
      <ul>
        {entries.map((entry: any) => (
          <li key={entry.id}>
            <a href={`/entry/${entry.id}`}>{entry.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
