import { useLoaderData, Link } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { IEntry } from "../../interfaces/entry.interface";
import { AppWrapper } from "../../components";
import { replaceRouteParams } from "../../helpers";
import { ENTRY } from "../../consts/links.const";
import { ITopic } from "../../interfaces/topic.interface";

export const Era = () => {
  const { topic, era, entries } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entries: IEntry[];
  };
  if (!era) return <div>Not found</div>;
  if (!entries) return <div>Loading...</div>;
  return (
    <AppWrapper>
      <p>{era.description}</p>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link
              to={replaceRouteParams(ENTRY, {
                topicSlug: topic.slug,
                eraSlug: era.slug,
                entryId: entry.id,
              })}
            >
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </AppWrapper>
  );
};
