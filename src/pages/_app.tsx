import '@/styles/globals.css';
import { HydrationBoundary } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Toaster } from '@/shared/ui/toast/Toaster';
import QueryProvider from '@/shared/provider/QueryProvider';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <QueryProvider>
      <HydrationBoundary state={pageProps?.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </HydrationBoundary>
    </QueryProvider>
  );
}
