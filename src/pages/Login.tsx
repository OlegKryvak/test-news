import { FC, FormEvent, useCallback, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { authSelector, setLoader } from "../store/reducers/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signin } from "../utils/functions";

type Props = {};

export const Login: FC<Props> = () => {
  const [errText, setErrorText] = useState<string | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loader } = useAppSelector(authSelector);
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(setLoader(true));
      const formData = new FormData(event.currentTarget);
      const username = formData.get("userName") as string;
      const password = formData.get("password") as string;
      if (username === "admin" && password === "12345") {
        signin(username, () => {
          navigate(from, { replace: true });
        });
      } else {
        setErrorText(t("wrongLogin"));
        dispatch(setLoader(false));
      }
    },
    [dispatch, navigate, t, from]
  );
    
  useLayoutEffect(() => {
    dispatch(setLoader(false));
  }, [dispatch]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("signIn")}
          </Button>
          {errText && (
            <Alert
              sx={{ display: "flex", alignItems: "center" }}
              severity="error"
            >
              {t("wrongLogin")}
            </Alert>
          )}
        </Box>
        {loader && <CircularProgress sx={{marginTop: 2}} color="secondary" />}
      </Box>
    </Container>
  );
};
