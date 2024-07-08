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
import SendIcon from "@mui/icons-material/Send";
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
  TextField,
} from "@mui/material";

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
    transition: theme.transitions.create(["margin, width"], {
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
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [inputShrink, setInputShrink] = useState(false);
  const [typing, setTyping] = useState(false);
  const [typingInterval, setTypingInterval] = useState<NodeJS.Timeout | null>(null);

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

  const stopTyping = () => {
    if (typingInterval) {
      clearInterval(typingInterval);
      setTypingInterval(null);
      setTyping(false);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage) return;

    setInputShrink(true);
    const newMessages = [...messages, { sender: "You", text: currentMessage }];
    setMessages(newMessages);
    setCurrentMessage("");
    setTyping(true);

    try {
      const response = await fetch('https://us-central1-gemini-chat-14f5d.cloudfunctions.net/geminiChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: currentMessage })
      });

      const data = await response.json();
      console.log('Response from AI:', data.response);
      const aiMessage = data.response;

      setMessages((prevMessages) => [...prevMessages, { sender: 'AI', text: aiMessage }]);
      setTyping(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { sender: 'AI', text: 'Sorry, something went wrong.' }]);
      setTyping(false);
    }
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
                <ListItemText primary="User name" sx={{ color: "white", fontSize: "0.875rem" }} />
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
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#121212",
        }}
      >
        <DrawerHeader />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box
              sx={{
                width: "100%",
                maxWidth: 800,
                backgroundColor: "#232323",
                borderRadius: 2,
                p: 3,
                boxShadow: 3,
                overflowY: "auto",
                maxHeight: "60vh",
              }}
            >
              {messages.map((message, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  gutterBottom
                  sx={{
                    backgroundColor: message.sender === "You" ? "#3f51b5" : "#616161",
                    color: "white",
                    p: 1,
                    borderRadius: 2,
                    alignSelf: message.sender === "You" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                    mt: 1,
                  }}
                >
                  {message.sender}: {message.text}
                </Typography>
              ))}
              {typing && (
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    backgroundColor: "#616161",
                    color: "white",
                    p: 1,
                    borderRadius: 2,
                    alignSelf: "flex-start",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                    mt: 1,
                  }}
                >
                  AI is typing...
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                mt: 3,
                width: "100%",
                maxWidth: 800,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={sendMessage}>
                        <SendIcon />
                      </IconButton>
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
