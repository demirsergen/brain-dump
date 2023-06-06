import Head from 'next/head';
import LandingPage from '../components/LandingPage';

export default function Home() {
  return (
    <div className="flex-1">
      <Head>
        <title>braindump</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon1.png" />
      </Head>
      <LandingPage />
    </div>
  );
}
