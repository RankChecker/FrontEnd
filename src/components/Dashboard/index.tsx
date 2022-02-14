import { Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { useSocket } from "../../services/socket";
import { ISearchStatus } from "../../types";
import { CardRanking } from "../CardRanking";
import { FormSearch } from "../FormSearch";
import { Header } from "../Header";
import { SideBar } from "../SideBar";
import { TableComponent } from "../Table/Table";
import avatar from "../../assets/avatar.jpeg";
import Image from "next/image";
import style from "./dashboard.module.scss";

export const Dashboard = () => {
  const socket = useSocket("https://rankcheckerapp.herokuapp.com");
  const drawerWidth = 240;
  const [keywordsStatus, setKeywordsStatus] = useState({} as ISearchStatus);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const getInitialData = async () => {
    const { data } = await ApiService.get("/status");
    if(data.keywords){
      const keywords = revertData(data.keywords);
      setKeywordsStatus({...data,keywords})
    }else setKeywordsStatus(data);
    if (data.status) setProgress(data.status);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const revertData = (keywords : ISearchStatus['keywords']) =>{
    const reverse = keywords.reverse();
    const lastItem = reverse.findIndex((keywords) => keywords.status);
    return keywords.slice(lastItem -1,keywords.length);
  }

  useEffect(() => {
    if (!socket) return;
    socket.on("searchStatus", (searchStatus: ISearchStatus) => {
      const keywords = revertData(searchStatus.keywords);
      setKeywordsStatus({...searchStatus,keywords});
      setProgress(searchStatus.status);
    });

    socket.on("email", (emailMessage) => {
      setOpen(true);
      setKeywordsStatus({ message: "Busca finalizada" });
    });
  }, [socket]);

  return (
    <>
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "auto",
        }}
      >
        <div className={style.welcomeSection}>
          <Image src={avatar} alt="Avatar" width={57} height={57} className={style.avatar}/>
          <div className={style.welcome}>
            <h1>Bem vindo(a) 👋</h1>
            <span>Ranqueamento de Palavras Chave</span>
          </div>
        </div>
        {keywordsStatus.message && <FormSearch />}
        {keywordsStatus.keywords && (
          <>
            <span className={style.titleSection}>Gerando Relatório</span>
            <CardRanking
              client={keywordsStatus.client}
              url={keywordsStatus.client}
              progress={progress}
            />
            <TableComponent keywords={keywordsStatus.keywords} />
          </>
        )}
      </Box>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          E-mail enviado com sucesso
        </Alert>
      </Snackbar>
    </>
  );
};
