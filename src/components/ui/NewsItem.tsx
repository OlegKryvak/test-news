import { FC, useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import { deleteNews } from "../../store/reducers/news";
import { useAppDispatch } from "../../store/hooks";
import { modalStyle } from "../../styles";

type Props = {
  post: INews;
};

export const NewsItem: FC<Props> = ({ post }) => {
  const { id, title, description, img, author } = post;
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const deleteNewsHandler = useCallback((id: number): void => {
    dispatch(deleteNews(id));
  }, [dispatch]);

  return (
    <Grid item xl={4} xs={12} md={6} sx={{ aspectRatio: 1 }}>
      <Card
        elevation={6}
        key={title}
        sx={{
          boxSizing: "border-box",
          padding: 1,
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
            <Typography
              textAlign="center"
              sx={{ width: "90%" }}
              component="h2"
              variant="h6"
            >
              {title}
            </Typography>
            <Typography
              textAlign="center"
              sx={{ width: "80%" }}
              component="span"
              variant="body2"
            >
              {description.slice(0, 100)}...
            </Typography>
            <Typography
              textAlign="center"
              sx={{ width: "80%" }}
              component="span"
              variant="body2"
            >
              {author}
            </Typography>
            <Button onClick={handleOpen} variant="contained" color="inherit">
              <DeleteForeverIcon color="error" />
            </Button>
          </Stack>
        </Stack>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("confirmDelete")}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              color="error"
            >
              {t("no")}
            </Button>
            <Button
              onClick={() => deleteNewsHandler(id)}
              variant="contained"
              color="success"
            >
              {t("yes")}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Grid>
  );
};
