"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from 'next/navigation';

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter()

  const settings = [
    {
      label: "Usuarios",
      onClick: () => router.push("/Usuario"),
    },
    {
      label: "Filmes",
      onClick: () => router.push("/filmes"),
    },
    // {
    //   label: "Locação",
    //   onClick: () => router.push('/location'),
    // },
  ];

  const menuItem = [
    {
      label: "Logout",
      onClick: () => router.push('/'),
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container  maxWidth={false} style={{padding: 0}} data-testid="header">
        <Toolbar disableGutters style={{justifyContent: "space-between"}}>
          <Button onClick={handleOpenUserMenu} style={{ color: "white" }}>
            Menu
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {menuItem.map((menuItem) => (
              <MenuItem
                key={menuItem.label}

                onClick={() => {
                  menuItem.onClick();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">{menuItem.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ flexGrow: 0, padding: 1 }} data-testid="user-info-header">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}

                  onClick={() => {
                    setting.onClick();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
