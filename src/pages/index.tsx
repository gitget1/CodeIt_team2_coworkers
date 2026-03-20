import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { ReactElement } from 'react';

export default function LandingPage() {
  return <></>;
}

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
