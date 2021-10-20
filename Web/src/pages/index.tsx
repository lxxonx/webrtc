import { styled } from "@mui/system";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

const HomeMenu = styled("div")`
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      <Layout>
        <HomeMenu>
          <Link href="/login">login</Link>
          <Link href="/chat">chat</Link>
        </HomeMenu>
      </Layout>
    </>
  );
}
