import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import '../styles/globals.css';

function AppWrapper({ Component, pageProps }) {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login' && router.pathname !== '/register') {
      router.push('/login'); // Redirect to login if no token is found
    } else if (router.pathname === '/') {
      router.push('/login'); // Redirect root path to login
    }
  }, [auth.isLoggedIn, router]);

  if (!isMounted) {
    return null; // Prevent rendering until the component has mounted
  }

  return (
    <div suppressHydrationWarning>
      <Component {...pageProps} />
    </div>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppWrapper Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}
