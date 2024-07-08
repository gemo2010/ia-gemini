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
  InputAdornment,
} from "@mui/material";
import { CustomTextField } from "../../components";
import { useNavigate } from "react-router-dom";

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

interface Message {
  sender: string;
  text: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]); // <-- Define el tipo para messages
  const [currentMessage, setCurrentMessage] = useState("");
  const [inputShrink, setInputShrink] = useState(false);

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

  const sendMessage = async () => {
    if (!currentMessage) return;

    setInputShrink(true);
    const newMessages: Message[] = [
      ...messages,
      { sender: "You", text: currentMessage },
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setLoadingButton(true);

    try {
      const response = await fetch(
        "https://us-central1-gemini-chat-14f5d.cloudfunctions.net/geminiChat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: currentMessage }),
        }
      );

      const data = await response.json();
      console.log("Response from AI:", data.response);
      const aiMessage = data.response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI", text: aiMessage },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { sender: "AI", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    window.history.pushState(null, window.location.href);

    window.onpopstate = function () {
      if (window.location.pathname === "/") {
        navigate("/");
      } else {
        history.go(1);
      }
    };

    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

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
        className="p-8 lg:p-20 w-full"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
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
          <>
            <div
              className="chat-messages"
              id="chat-messages"
              style={{
                marginBottom: "1rem",
                width: "100%",
                backgroundColor: "#121212",
                color: "white",
                borderRadius: "0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingBottom: "5rem", // Added padding to make space for input field
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender.toLowerCase()}`}
                  style={{
                    margin: "0.5rem 0",
                    display: "flex",
                    justifyContent:
                      message.sender === "You" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "60%",
                      backgroundColor:
                        message.sender === "You" ? "#1976d2" : "#333",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <p
                      className="sender"
                      style={{ fontWeight: "bold", margin: 0 }}
                    >
                      {message.sender}
                    </p>
                    <p className="message-text" style={{ margin: 0 }}>
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: open ? drawerWidth : 0,
                width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
                backgroundColor: "#121212",
                padding: "1rem",
                borderTop: "1px solid #333",
              }}
            >
              <CustomTextField
                variant="outlined"
                fullWidth
                multiline={!inputShrink}
                rows={inputShrink ? 1 : 10}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Escribe aquí..."
                InputProps={{
                  style: { color: "white" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <button
                        onClick={sendMessage}
                        className="absolute bottom-0 right-0 bg-blue-500 hover:bg-transparent transition duration-300 border-2 border-blue-500 text-white rounded-md px-4 py-2 mb-[6px] mr-[6px]"
                        style={{ marginLeft: "1rem" }} // Adjusted margin to reduce space
                      >
                        {loadingButton ? (
                          <CircularProgress size={12} color="inherit" />
                        ) : (
                          "Send"
                        )}
                      </button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </>
        )}
      </Main>
    </Box>
  );
};

export default Chat;
