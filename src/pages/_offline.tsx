import Head from 'next/head';

const PAGE_TITLE = 'AM Smart Machine | Offline Page';

export default function Offline() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
      </Head>
      <h1>No internet</h1>
      <p>It looks like you&apos;re offline...</p>
      <p>Please connect to the internet and try again.</p>
    </>
  );
}
