import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { IEntery } from "../../interfaces/entery.interface";
import { BackButton } from "../../components";

export const Era = () => {
  const { era, entries } = useLoaderData() as any as {
    era: IEra;
    entries: IEntery[];
  };
  if (!era) return <div>Not found</div>;
  if (!entries) return <div>Loading...</div>;
  return (
    <div>
      <BackButton />
      <h1>{era.title}</h1>
      <p>{era.description}</p>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link to={`/entry/${entry.id}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
