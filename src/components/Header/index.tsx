import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import style from "./header.module.scss";
import avatar from "../../assets/avatar.svg";
import Image from "next/image";
import { Box } from "@mui/material";

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export function Header({ drawerWidth, handleDrawerToggle }: HeaderProps) {
  return (
    <Box
      className={style.header}
      display="flex"
      alignItems="center"
      px={4}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <div className={style.content}>
        <Image src={avatar} alt="Avatar" width={57} height={57} />
        <div className={style.welcome}>
          <h1>Bem vindo(a) 👋</h1>
          <span>Ranqueamento de Palavras Chave</span>
        </div>
      </div>
    </Box>
  );
}
