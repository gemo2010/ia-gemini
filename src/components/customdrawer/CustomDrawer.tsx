import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CustomDrawerProps {
  mobileOpen?: boolean;
  handleDrawerClose: () => void;
}

export const CustomDrawer = ({
  mobileOpen,
  handleDrawerClose,
}: CustomDrawerProps) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const menuItems = [
    { text: "Inicio", icon: <InboxIcon /> },
    { text: "Acerca de", icon: <StarIcon /> },
    { text: "Servicios", icon: <SendIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Drawer
        variant={isMediumScreen ? "permanent" : "temporary"}
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 200,
            boxSizing: "border-box",
            backgroundColor: "#393939",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: mobileOpen ? "initial" : "center",
                  px: 2.5,
                  transition: "all 0.5s ease",
                  "&:hover": {
                    backgroundColor: "black",
                    border: "1px solid white",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ backgroundColor: "gray" }} />
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: mobileOpen ? "initial" : "center",
                px: 2.5,
                transition: "all 0.5s ease",
                "&:hover": {
                  backgroundColor: "black",
                  border: "1px solid white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="User name" sx={{ color: "white" }} />
            </ListItemButton>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                justifyContent: mobileOpen ? "initial" : "center",
                px: 2.5,
                "&:hover": {
                  backgroundColor: "black",
                  border: "1px solid white",
                  transition: "all 0.5s ease",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 2,
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
