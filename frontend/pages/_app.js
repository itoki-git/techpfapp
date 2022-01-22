import React from 'react';
import { RecoilRoot } from 'recoil';
import AuthProvider from '../components/state/AuthStore';
import '../styles/globals.scss';
import 'sanitize.css';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <script> </script>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
