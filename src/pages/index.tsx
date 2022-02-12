import Head from 'next/head';
import { Header } from '../components/Header';
import { ResponsiveDrawer } from '../components/SideBar';
export default function Home() {
  return (
    <>
      <Head><title>RankChecker</title></Head>
      <ResponsiveDrawer/>
    </>
  )
}
