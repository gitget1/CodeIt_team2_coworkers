import '@/styles/globals.css';
import { HydrationBoundary } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Toaster } from '@/shared/ui/toast/Toaster';
import QueryProvider from '@/shared/provider/QueryProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <Toaster />
      </HydrationBoundary>
    </QueryProvider>
  );
}
