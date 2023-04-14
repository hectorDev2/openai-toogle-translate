import Head from "next/head";
import PageTranslate from "./page.tsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <PageTranslate />
    </div>
  );
}
