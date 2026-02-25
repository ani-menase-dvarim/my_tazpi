import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import logoImg from "../assets/Logo.png";

import Logo from '../assets/Logo.png';

type NavbarProps = {
  isAuthed: boolean;
  displayName?: string;
  onSignOut?: () => void;
};

export function Navbar({ isAuthed, onSignOut }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#f4c430",
        color: "#000",
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box
              component="img"
              src={logoImg}
              alt="logo"
              sx={{
                width: 90,
                height: 50,
                objectFit: "contain",
                bgcolor: "#ffffff",
              }}
            />

            {isAuthed && (
              <Box sx={{ display: "flex", gap: 3 }}>
                <Typography
                  sx={{ cursor: "pointer", fontWeight: 400 }}
                  onClick={() => navigate("activities")}
                >
                  פעילויות העמותה
                </Typography>

                <Typography
                  sx={{ cursor: "pointer", fontWeight: 400 }}
                  onClick={() => navigate("/general")}
                >
                  פורום
                </Typography>

                <Typography
                  sx={{ cursor: "pointer", fontWeight: 400 }}
                  onClick={() => navigate("/businesses")}
                >
                  עסקים
                </Typography>
              </Box>
            )}
          </Box>

          {isAuthed && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#fff",
                px: 2,
                py: 0.5,
                borderRadius: 3,
                flex: 1,
                maxWidth: 500,
                mx: 4,
              }}
            >
              <SearchIcon sx={{ color: "gray", ml: 1 }} />
              <InputBase
                placeholder="חיפוש קבוצות, פוסטים, אנשים..."
                fullWidth
              />
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuthed ? (
              <>
                <IconButton>
                  <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <Button
                  variant="contained"
                  onClick={onSignOut}
                  sx={{
                    bgcolor: "#fff",
                    color: "secondary.main",
                  }}
                >
                  התנתקות
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{ bgcolor: "#fff", color: "secondary.main" }}
                >
                  התחברות
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                >
                  הרשמה
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
