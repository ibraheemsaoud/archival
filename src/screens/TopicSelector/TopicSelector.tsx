import React from "react";
import { requestTopics } from "../../requests/requestTopics";
import { Link } from "react-router-dom";

export const TopicSelector = () => {
  const { data: topics, isLoading } = requestTopics();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>TopicSelector</h1>
      <ul>
        {topics?.map((topic) => (
          <li key={topic.id}>
            <Link to={`topic/${topic.id}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
