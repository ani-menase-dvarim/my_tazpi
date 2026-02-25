import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/index";
import IntroPage from "./pages/IntroPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Navbar } from "./components/Navbar";
import { Box } from "@mui/material";
import { APP_COLORS } from "./theme";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { GeneralForumPage } from "./pages/Forum/GeneralForumPage";
import { BusinessesPage } from "./pages/BusinessesPage";

export default function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const displayName = useMemo(() => {
    const md = session?.user?.user_metadata as
      | Record<string, unknown>
      | undefined;
    const fullName =
      typeof md?.full_name === "string" ? md.full_name : undefined;
    return fullName || session?.user?.email || "";
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    if (session === undefined) return;

    if (session === null) {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login", { replace: true });
      }
    }
  }, [session, navigate, location.pathname]);

  if (session === undefined) {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", background: APP_COLORS.background }}>
      <Navbar
        isAuthed={!!session}
        displayName={displayName}
        onSignOut={handleSignOut}
      />

      <Routes>
        <Route
          path="/"
          element={
            session ? <ActivitiesPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="general" element={<GeneralForumPage />} />
        <Route path="businesses" element={<BusinessesPage />} />

        {/* אופציונלי: שומר את מסך ה-Intro הישן אם תרצי אליו קישור בהמשך */}
        <Route path="/intro" element={<IntroPage />} />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/index" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}
