import { FC } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Card, Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {};

export const Profile: FC<Props> = () => {
  const userName = localStorage.getItem("user");
  const { t } = useTranslation();
  return (
    <Container>
      <Stack direction="column" alignItems="center">
        <AccountCircleIcon color="secondary" sx={{ width: 150, height: 150 }} />
        <Card
          elevation={6}
          sx={{
            width: 350,
            padding: 5,
          }}
        >
          <Stack direction="row" spacing={0}>
            <Typography width='50%' textAlign="left" component="h2" variant="h5">
              {t("username")}
            </Typography>
            <Typography textAlign="left" component="h2" variant="h5">
              {userName}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography width='50%' textAlign="left" component="h2" variant="h5">
              {t("firstName")}
            </Typography>
            <Typography textAlign="left" component="h2" variant="h5">
              {t("oleg")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography width='50%' textAlign="left" component="h2" variant="h5">
              {t("lastName")}
            </Typography>
            <Typography textAlign="left" component="h2" variant="h5">
              {t("kryvak")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0}>
            <Typography width='50%' textAlign="left" component="h2" variant="h5">
              {t("age")}
            </Typography>
            <Typography textAlign="left" component="h2" variant="h5">
              20
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
