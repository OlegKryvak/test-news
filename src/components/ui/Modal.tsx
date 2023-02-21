import { FC } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { modalStyle } from "../../styles";

interface Props {
  open: boolean;
  handleClose: () => void;
  deletePost: () => void;
}

export const ModalDelete: FC<Props> = ({ open, handleClose, deletePost }) => {
  const { t } = useTranslation();

  return (
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
          <Button onClick={handleClose} variant="contained" color="error">
            {t("no")}
          </Button>
          <Button onClick={deletePost} variant="contained" color="success">
            {t("yes")}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Modal;
