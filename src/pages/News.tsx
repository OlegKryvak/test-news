import { FC, useCallback, useEffect, useState } from "react";
import { Button, CircularProgress, Container, Grid } from "@mui/material";
import { clearNews, getAllNews, newsSelector } from "../store/reducers/news";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NewsItem } from "../components/ui/NewsItem";
import { useTranslation } from "react-i18next";

type Props = {};

export const News: FC<Props> = () => {
  const [page, setPage] = useState<number>(1);
  const { news, loader } = useAppSelector(newsSelector);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const changePageNumber = useCallback(
    () => {
      setPage((prev) => prev + 1);
    },
    []
  );

  useEffect(() => {
    if(page === 1){
      dispatch(clearNews());
    }
    dispatch(getAllNews(page));
  }, [page, dispatch]);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {news.length > 0 && (
        <>
          <Grid container spacing={2}>
            {news.map((post: INews) => {
              return <NewsItem key={Math.random()} post={post} />;
            })}
          </Grid>
          <Button
            onClick={changePageNumber}
            sx={{ marginTop: 2, marginBottom: 2 }}
            variant="contained"
            color="secondary"
          >
            {t("loadMore")}
          </Button>
        </>
      )}
      {loader && <CircularProgress color="secondary" />}
    </Container>
  );
};
