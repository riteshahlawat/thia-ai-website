import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar/Navbar';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
