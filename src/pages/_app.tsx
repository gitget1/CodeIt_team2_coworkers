import '@/styles/globals.css';
import { HydrationBoundary } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Toaster } from '@/shared/ui/toast/Toaster';
import QueryProvider from '@/shared/provider/QueryProvider';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main
      className={`${pretendard.variable} ${pretendard.className} text-txt-primary bg-background-primary font-sans antialiased`}
    >
      <QueryProvider>
        <HydrationBoundary state={pageProps?.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
        </HydrationBoundary>
      </QueryProvider>
    </main>
  );
}
