import React from "react";
import { requestEra } from "../../requests/requestEra";

export const Era = ({ id }: { id: string }) => {
  const { data: era, isLoading } = requestEra(id);
  if (isLoading) return <div>Loading...</div>;
  if (!era) return <div>Not found</div>;
  return (
    <div>
      <h1>{era.title}</h1>
      <p>{era.description}</p>
    </div>
  );
};
