import { FC } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Profile } from "../pages/Profile";
import { useAuth } from "../hooks/auth";
import { Login } from "../pages/Login";
import { Main } from "../pages/Main";
import { News } from "../pages/News";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();  
  return auth ? (
    children
  ) : (
    <Navigate to="/test-news" state={{ from: location }} replace />
  );
};

export const Navigation: FC = () => {
  return (
      <Routes>
        <Route path="/test-news" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
  );
};
