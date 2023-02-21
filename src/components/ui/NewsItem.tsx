import { FC, memo, useCallback, useState } from "react";
import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteNews } from "../../store/reducers/news";
import { useAppDispatch } from "../../store/hooks";
import { ModalDelete } from "./Modal";
import { useTranslation } from "react-i18next";

type Props = {
  post: INews;
};
 const NewsItem: FC<Props> = ({ post }) => {
  const { id, title, description, img, author } = post;
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const dispatch = useAppDispatch();
  const {t} = useTranslation()

  const deleteNewsHandler = useCallback(
    (id: number): void => {
      dispatch(deleteNews(id));
    },
    [dispatch]
  );

  return (
    <Grid item xl={4} xs={12} md={6} sx={{ aspectRatio: 1 }}>
      <Card
        elevation={6}
        key={title}
        sx={{
          boxSizing: "border-box",
          paddingX: 1,
          paddingY: 2,
          aspectRatio: 1,
        }}
      >
        <Stack alignItems="center" direction="column" spacing={2}>
          <img
            style={{ aspectRatio: 1.25, width: "50%", borderRadius: 5 }}
            src={img}
            alt={title}
          />
          <Stack direction="column" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography textAlign="center" component="h2" variant="h5">
                {t('title')}
              </Typography>
              <Typography textAlign="center" component="h2" variant="h6">
                {title}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography textAlign="center" component="span" variant="h6">
                {t('description')}
              </Typography>
              <Typography textAlign="center" component="span" variant="body2">
                {description}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography textAlign="center" component="span" variant="h6">
                {t('author')}
              </Typography>
              <Typography textAlign="center" component="span" variant="body2">
                {author}
              </Typography>
            </Stack>

            <Button onClick={handleOpen} variant="contained" color="inherit">
              <DeleteForeverIcon color="error" />
            </Button>
          </Stack>
        </Stack>
      </Card>
      <ModalDelete
        open={open}
        handleClose={handleClose}
        deletePost={() => deleteNewsHandler(id)}
      />
    </Grid>
  );
};

export default memo(NewsItem);