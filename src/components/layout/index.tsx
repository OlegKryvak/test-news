import React, { FC, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Button, Container, Toolbar } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from "@mui/material/AppBar";
import { signout } from "../../utils/functions";
import { activeNavStyle, unActiveNavStyle } from "../../styles";
import { useAuth } from "../../hooks/auth";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme();

export const Layout: FC<Props> = ({ children }) => {
  const user = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  const handleChangeLanguage = useCallback(
    (event: React.MouseEvent<HTMLElement>, language: 'uk' | 'en') => {
      i18n.changeLanguage(language);
      localStorage.setItem('language', language)
    },
    [i18n]
  );

  const logout = useCallback(() => {
    signout(() => {
      navigate("/login");
    });
  }, [navigate]);

  const login = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="primary"
        elevation={10}
        sx={{
          height: 61,
          padding: "0 40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          onClick={() => (user ? logout() : login())}
          sx={{ width: 50 }}
          variant="contained"
          color="inherit"
        >
          {user ? <LogoutIcon color="warning"/> : <LoginIcon color="success" />}
        </Button>
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "center" }}>
          <nav>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeNavStyle : unActiveNavStyle
              }
              to="/test-news"
            >
              {t("main")}
            </NavLink>
            <NavLink
              to="/news"
              style={({ isActive }) =>
                isActive ? activeNavStyle : unActiveNavStyle
              }
            >
              {t("news")}
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeNavStyle : unActiveNavStyle
              }
              to="/profile"
            >
              {t("profile")}
            </NavLink>
          </nav>
        </Toolbar>
        <ToggleButtonGroup
          color="warning"
          exclusive
          value={currentLanguage}
          onChange={handleChangeLanguage}
          aria-label="Platform"
        >
          <ToggleButton sx={{ backgroundColor: "#fff" }} value="en">
            EN
          </ToggleButton>
          <ToggleButton sx={{ backgroundColor: "#fff" }} value="uk">
            UK
          </ToggleButton>
        </ToggleButtonGroup>
      </AppBar>
        <Container component="main" sx={{ paddingTop: 10, paddingBottom: 10 }}>{children}</Container>
    </ThemeProvider>
  );
};
