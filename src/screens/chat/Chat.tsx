import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import StarIcon from "@mui/icons-material/Star";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  CircularProgress,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../../components";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  backgroundColor: "#232323",
}));

export default function Chat() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendQuestion = () => {
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);
  };

  const menuItems = [
    { name: "Inbox", icon: <InboxIcon /> },
    { name: "Starred", icon: <StarIcon /> },
    { name: "Send email", icon: <MailIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", backgroundColor: "#121212" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#121212" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AI CODE
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#232323",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "gray" }} />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  transition: "all 0.5s ease",
                  "&:hover": {
                    backgroundColor: "black",
                    border: "1px solid white",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ backgroundColor: "gray" }} />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
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
          </List>
        </Box>
      </Drawer>
      <Main
        open={open}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-10 w-full">
            <p className="text-white text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-8xl text-center">
              Ingresa un texto
            </p>
            <div className="relative w-full lg:w-[700px]">
              <CustomTextField
                rows={10}
                multiline
                fullWidth
                className="text-white p-4"
                placeholder="Escribe aquí..."
              />
              <button
                onClick={handleSendQuestion}
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-transparent transition duration-300 border-2 border-blue-500 text-white rounded-md px-4 py-2 m-4"
              >
                {loadingButton ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>
        )}
      </Main>
    </Box>
  );
}
