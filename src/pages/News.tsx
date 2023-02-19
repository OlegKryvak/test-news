import { FC, useEffect } from "react";
import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { getAllNews, newsSelector } from "../store/reducers/news";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NewsItem } from "../components/ui/NewsItem";
import { useTranslation } from "react-i18next";

type Props = {};

export const News: FC<Props> = () => {
  const { news, loader } = useAppSelector(newsSelector);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllNews());
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {loader ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <Grid container spacing={2}>
            {news.map((post: INews) => {
              return <NewsItem post={post} />;
            })}
          </Grid>
          <Button sx={{ marginTop: 2 }} variant="contained" color="secondary">
            {t("loadMore")}
          </Button>
        </>
      )}
    </Container>
  );
};
