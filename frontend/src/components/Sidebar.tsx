import type { ReactNode } from "react";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";

export interface SidebarItem {
  id: number | string;
  label: string;
  path: string;
  icon?: ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  width?: number | string;
  collapsed?: boolean;
  title?: string;
  subtitle?: string;
  rtl?: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: () => void;
}

export function Sidebar({
  items,
  width = 240,
  collapsed = false,
  title,
  subtitle,
  rtl = true,
  onToggleCollapse,
  onItemClick,
}: SidebarProps) {
  const location = useLocation();

  return (
    <Box
      sx={{
        width,
        height: "100%",
        border: "1px solid",
        borderColor: alpha("#0f172a", 0.1),
        borderRadius: 4,
        p: 1.25,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(239,246,255,0.98) 38%, rgba(224,242,254,0.96) 100%)",
        backdropFilter: "blur(8px)",
        boxShadow:
          "0 18px 38px rgba(2, 6, 23, 0.08), inset 0 1px 0 rgba(255,255,255,0.65)",
        transition: "width 220ms ease, padding 220ms ease",
        overflow: "hidden",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      {(title || onToggleCollapse) && (
        <Box sx={{ px: 0.25, pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              gap: 1,
              minHeight: 52,
              borderRadius: 3,
              px: collapsed ? 0 : 1,
              py: 0.9,
              border: "1px solid",
              borderColor: alpha("#0284c7", 0.12),
              background: collapsed
                ? "transparent"
                : "linear-gradient(135deg, rgba(2,132,199,0.14), rgba(59,130,246,0.10))",
            }}
          >
            {!collapsed && (
              <Box sx={{ minWidth: 0, flex: 1 }}>
                {title ? (
                  <Typography
                    variant="h6"
                    fontWeight={1000}
                    noWrap
                    sx={{ textAlign: "center", letterSpacing: "0.01em" }}
                  >
                    {title}
                  </Typography>
                ) : null}
                {subtitle ? (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", textAlign: "center" }}
                    noWrap
                  >
                    {subtitle}
                  </Typography>
                ) : null}
              </Box>
            )}

            {onToggleCollapse ? (
              <Tooltip title={collapsed ? "Open menu" : "Close menu"}>
                <IconButton
                  size="small"
                  onClick={onToggleCollapse}
                  sx={{
                    border: "1px solid",
                    borderColor: alpha("#0284c7", 0.16),
                    bgcolor: "rgba(255,255,255,0.9)",
                    color: "primary.dark",
                    boxShadow: "0 4px 14px rgba(2,132,199,0.08)",
                    "&:hover": { bgcolor: "background.paper" },
                  }}
                >
                  {collapsed ? (
                    <MenuRoundedIcon fontSize="small" />
                  ) : (
                    <MenuOpenRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>

          <Divider sx={{ mt: 1, opacity: 0.7 }} />
        </Box>
      )}

      <Box
        sx={{
          borderRadius: 3,
          p: 0.5,
          background: "rgba(255,255,255,0.55)",
          border: "1px solid",
          borderColor: alpha("#0f172a", 0.04),
        }}
      >
        <List sx={{ display: "grid", gap: 0.5 }}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const listButton = (
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={isActive}
              onClick={onItemClick}
              sx={{
                direction: "rtl",
                borderRadius: 2,
                px: collapsed ? 1 : 1.25,
                py: 0.75,
                minHeight: 46,
                justifyContent: collapsed ? "center" : "flex-start",
                flexDirection: collapsed
                  ? "row"
                  : "row",
                transition: "all 0.18s ease",
                "&:hover": {
                  backgroundColor: alpha("#0284c7", 0.08),
                  transform: rtl ? "translateX(2px)" : "translateX(-2px)",
                },
                "&.Mui-selected": {
                  background:
                    "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                  color: "primary.contrastText",
                  boxShadow: "0 10px 22px rgba(37, 99, 235, 0.24)",
                },
                "&.Mui-selected:hover": {
                  background:
                    "linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%)",
                },
                "& .MuiListItemIcon-root": {
                  minWidth: collapsed ? 0 : 36,
                  mr: collapsed ? 0 : 0.35,
                  ml: 0,
                  color: "inherit",
                  justifyContent: "center",
                },
                "& .MuiListItemText-primary": {
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  textAlign: collapsed ? "left" : "left",
                },
                "& .MuiListItemText-root": {
                  margin: 0,
                  textAlign: collapsed ? "left" : "left",
                  direction: rtl ? "rtl" : "ltr",
                },
              }}
            >
              {!collapsed ? <ListItemText primary={item.label} /> : null}
              {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
            </ListItemButton>
          );

          return (
            <ListItem key={item.id} disablePadding>
              {collapsed ? (
                <Tooltip title={item.label} placement="left">
                  {listButton}
                </Tooltip>
              ) : (
                listButton
              )}
            </ListItem>
          );
        })}
        </List>
      </Box>
    </Box>
  );
}
