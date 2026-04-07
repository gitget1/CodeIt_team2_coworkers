import { LandingContainer } from '@/widgets/landing';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import Head from 'next/head';
import { ReactElement } from 'react';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Coworkers</title>
        <meta
          name="description"
          content="팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법"
        />
      </Head>

      <LandingContainer />
    </>
  );
}

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
