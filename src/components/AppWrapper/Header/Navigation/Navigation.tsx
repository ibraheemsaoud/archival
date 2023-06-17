import { Breadcrumbs, Link } from "@mui/material";
import { useLoaderData, useParams, Link as NavLink } from "react-router-dom";
import { replaceRouteParams } from "../../../../helpers";
import { ENTRY, ERA, TOPIC } from "../../../../consts/links.const";
import { ITopic } from "../../../../interfaces/topic.interface";
import { IEra } from "../../../../interfaces/era.interface";
import { IEntry } from "../../../../interfaces/entry.interface";

export const Navigation = () => {
  const params = useParams();

  const isTopicPrimary = !params.eraId && !params.earSlug;
  const isEraPrimary = params.eraId && !params.entryId;
  const isEntryPrimary = params.entryId;

  const { topic, era, entry } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entry: IEntry;
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {params.topicId && (
          <Link
            underline="hover"
            color={isTopicPrimary ? "text.primary" : "inherit"}
            component={NavLink}
            to={replaceRouteParams(TOPIC, { topicId: params.topicId })}
          >
            {topic?.title}
          </Link>
        )}
        {params.topicId && params.eraId && (
          <Link
            underline="hover"
            color={isEraPrimary ? "text.primary" : "inherit"}
            component={NavLink}
            to={replaceRouteParams(ERA, {
              topicId: params.topicId,
              eraId: params.eraId,
            })}
          >
            {era.title}
          </Link>
        )}
        {params.topicId && params.eraId && params.entryId && (
          <Link
            underline="hover"
            // aria-current="page"
            color={isEntryPrimary ? "text.primary" : "inherit"}
            component={NavLink}
            to={replaceRouteParams(ENTRY, {
              topicId: params.topicId,
              eraId: params.eraId,
              entryId: params.entryId,
            })}
          >
            {entry.title}
          </Link>
        )}
      </Breadcrumbs>
    </div>
  );
};
