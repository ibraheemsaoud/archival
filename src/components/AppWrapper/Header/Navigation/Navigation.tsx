import { Breadcrumbs, Link } from "@mui/material";
import { useLoaderData, useParams, Link as NavLink } from "react-router-dom";
import { replaceRouteParams } from "../../../../helpers";
import { ENTERY, ERA, TOPIC } from "../../../../consts/links.const";
import { ITopic } from "../../../../interfaces/topic.interface";
import { IEra } from "../../../../interfaces/era.interface";
import { IEntery } from "../../../../interfaces/entery.interface";

export const Navigation = () => {
  const params = useParams();

  const isTopicPrimary = !params.eraSlug && !params.earSlug;
  const isEraPrimary = params.eraSlug && !params.entryId;
  const isEntryPrimary = params.entryId;

  const { topic, era, entry } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entry: IEntery;
  };

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {params.topicSlug && (
          <Link
            underline="hover"
            color={isTopicPrimary ? "text.primary" : "inherit"}
            component={NavLink}
            to={replaceRouteParams(TOPIC, { topicSlug: params.topicSlug })}
          >
            {topic?.title}
          </Link>
        )}
        {params.topicSlug && params.eraSlug && (
          <Link
            underline="hover"
            color={isEraPrimary ? "text.primary" : "inherit"}
            component={NavLink}
            to={replaceRouteParams(ERA, {
              topicSlug: params.topicSlug,
              eraSlug: params.eraSlug,
            })}
          >
            {era.title}
          </Link>
        )}
        {params.topicSlug && params.eraSlug && params.entryId && (
          <Link
            underline="hover"
            // aria-current="page"
            color={isEntryPrimary ? "text.primary" : "inherit"}
            component={NavLink}
            to={replaceRouteParams(ENTERY, {
              topicSlug: params.topicSlug,
              eraSlug: params.eraSlug,
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
