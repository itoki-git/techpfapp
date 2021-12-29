import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthProvider from '../components/state/AuthStore';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
