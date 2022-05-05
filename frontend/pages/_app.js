import React from 'react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.scss';
import 'sanitize.css';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <script> </script>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
