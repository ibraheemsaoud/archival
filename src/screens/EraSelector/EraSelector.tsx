import React from "react";
import { useLoaderData } from "react-router-dom";
import { ITopic } from "../../interfaces/topic.interface";
import { requestEras } from "../../requests/requestEra";
import { Link } from "react-router-dom";

export const EraSelector = () => {
  const { topic } = useLoaderData() as any as { topic: ITopic };
  const { data: eras } = requestEras({ topicIds: [topic.id] });

  return (
    <div>
      <h1>EraSelector</h1>
      <ul>
        {eras?.map((era) => (
          <li key={era.id}>
            <Link to={`/era/${topic.id}`}>{era.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
