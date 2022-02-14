import Head from "next/head";
import { Dashboard } from "../components/Dashboard";
import { ResponsiveDrawer } from "../components/SideBar";
export default function Home() {
  return (
    <>
      <Head>
        <title>RankChecker</title>
      </Head>
      <Dashboard />
    </>
  );
}
