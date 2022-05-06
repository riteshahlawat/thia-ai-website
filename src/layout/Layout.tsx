import React from 'react';
import Footer from './Footer';
import Nav from './Navbar';

type Props = {
	children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
