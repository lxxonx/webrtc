import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
export default function Home() {
  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      <Layout>
        <Link href="https://nextjs.org/learn">our Next.js tutorial</Link>.
        <Link href="/login">login</Link>
        <Link href="/chat">chat</Link>
      </Layout>
    </>
  );
}
