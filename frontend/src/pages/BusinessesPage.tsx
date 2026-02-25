import { useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CampaignIcon from "@mui/icons-material/Campaign";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Box,
  Button,
  Drawer,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Sidebar, type SidebarItem } from "../components/Sidebar";

const DESKTOP_SIDEBAR_WIDTH = 320;
const DESKTOP_COLLAPSED_WIDTH = 92;
const MOBILE_SIDEBAR_WIDTH = 320;

const businessForumSidebarItems: SidebarItem[] = [
  {
    id: "businesses",
    label: "בתי עסק",
    path: "/forums/businesses",
    icon: <StorefrontIcon fontSize="small" />,
  },
  {
    id: "partnerships",
    label: "שיתופי פעולה",
    path: "/forums/businesses/partnerships",
    icon: <HandshakeIcon fontSize="small" />,
  },
  {
    id: "marketing",
    label: "שיווק ופרסום",
    path: "/forums/businesses/marketing",
    icon: <CampaignIcon fontSize="small" />,
  },
  {
    id: "suppliers",
    label: "ספקים וחברות",
    path: "/forums/businesses/suppliers",
    icon: <ApartmentIcon fontSize="small" />,
  },
];

export function BusinessesPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const sidebarWidth = isDesktopSidebarCollapsed
    ? DESKTOP_COLLAPSED_WIDTH
    : DESKTOP_SIDEBAR_WIDTH;

  const sidebarContent = (
    <Sidebar
      items={businessForumSidebarItems}
      width="100%"
      collapsed={isDesktop ? isDesktopSidebarCollapsed : false}
      rtl={true}
      title="פורום עסקים"
      subtitle="ניווט מהיר"
      onToggleCollapse={
        isDesktop
          ? () => setIsDesktopSidebarCollapsed((prev) => !prev)
          : () => setIsMobileSidebarOpen(false)
      }
      onItemClick={!isDesktop ? () => setIsMobileSidebarOpen(false) : undefined}
    />
  );

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        gap: { xs: 1.5, md: 2.5 },
        alignItems: "right",
        flexDirection: { xs: "row", md: "row-reverse" },
        p: { xs: 1, md: 2 },
        background:
          "linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(239,246,255,0.7) 100%)",
        borderRadius: 4,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            mb: 1.5,
          }}
        >
          <Button
            variant="contained"
            startIcon={<MenuRoundedIcon />}
            onClick={() => setIsMobileSidebarOpen(true)}
            sx={{
              borderRadius: 999,
              px: 2,
              background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
              boxShadow: "0 12px 24px rgba(37,99,235,0.24)",
            }}
          >
            פתיחת תפריט
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            border: "1px solid",
            borderColor: "rgba(148,163,184,0.28)",
            borderRadius: 5,
            p: { xs: 2, md: 3.5 },
            background:
              "radial-gradient(circle at 100% 0%, rgba(14,165,233,0.16), transparent 50%), radial-gradient(circle at 0% 100%, rgba(37,99,235,0.08), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
            boxShadow:
              "0 20px 45px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Stack spacing={1.25}>
            <Typography variant="h4" fontWeight={800}>
              בתי עסק
            </Typography>
            <Typography color="text.secondary">
              ניהול קטגוריות, דיונים ותוכן בפורום העסקי במקום אחד.
            </Typography>
          </Stack>
        </Paper>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: sidebarWidth,
          flexShrink: 0,
          transition: "width 220ms ease",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 8,
            height: "100dvh",
            py: 0.5,
          }}
        >
          {sidebarContent}
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={!isDesktop && isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: `min(${MOBILE_SIDEBAR_WIDTH}px, 90vw)`,
            p: 1,
            bgcolor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Box sx={{ height: "100dvh", py: 1 }}>{sidebarContent}</Box>
      </Drawer>
    </Box>
  );
}
