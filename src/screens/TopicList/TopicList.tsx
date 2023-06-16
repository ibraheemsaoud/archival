import { requestTopics } from "../../requests/requestTopics";
import { AppWrapper, EraCard, TopicCard } from "../../components";
import { Grid, Link, Typography } from "@mui/material";
import { SUPPORT_EMAIL } from "../../consts/outsideLinks";
import { uesRequestDashboardEras } from "../../requests";

export const TopicList = () => {
  const { data: topics, isLoading } = requestTopics();
  const { data: eras } = uesRequestDashboardEras();

  const getTopicSlugFromId = (topicId: string) => {
    const topic = topics?.find((topic) => topic.id === topicId);
    return topic?.slug;
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <AppWrapper>
      <Typography variant="h5" gutterBottom>
        Checkout one of the topics below to get started!
        <br />
        Each topic has a curated list of <i>eras</i> that are currently ongoing
        and <i>archival</i> ones.
      </Typography>
      <br />

      <Grid container spacing={2}>
        {topics?.map((topic) => (
          <Grid item xs={6} md={4} lg={2} key={`TOPIC_CARD_${topic.id}`}>
            <TopicCard topic={topic} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="body1" gutterBottom marginTop={6}>
        if you want to suggest a new topic, please contact us at{" "}
        <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>
      </Typography>
      <Typography variant="h5" gutterBottom marginTop={6}>
        Current Eras
      </Typography>
      <Grid container spacing={2}>
        {eras?.map((era) => (
          <Grid item xs={12} lg={6} key={`ERA_CARD_${era.id}`}>
            <EraCard
              era={era}
              topicSlug={getTopicSlugFromId(era.topicId) || "-1"}
            />
          </Grid>
        ))}
      </Grid>
    </AppWrapper>
  );
};
