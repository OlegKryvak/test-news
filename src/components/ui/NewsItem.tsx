import { FC } from "react";
import { Card, Grid, Link, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import moment from "moment";

type Props = {
  post: INews;
};

export const NewsItem: FC<Props> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12} md={6} sx={{ aspectRatio: 1 }}>
      <Card
        elevation={6}
        key={post.title}
        sx={{
          boxSizing: "border-box",
          padding: 1,
          aspectRatio: 1,
        }}
      >
        <Stack alignItems="center" direction="column" spacing={2}>
          <img
            style={{ aspectRatio: 1.25, width: "50%", borderRadius: 5 }}
            src={post?.urlToImage}
            alt={post?.title}
          />
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography
              minHeight={100}
              textAlign="center"
              sx={{ width: "90%" }}
              component="h2"
              variant="h6"
            >
              {post.title}
            </Typography>
            <Typography
              textAlign="center"
              sx={{ width: "80%" }}
              component="span"
              variant="body2"
            >
              {post.description.slice(0, 100)}...
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href={post.url} target="_blank" underline="none">
                {t("more")}
              </Link>
              <Typography component="span" variant="body2">
                {moment(post.publishedAt).format("LLL")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
