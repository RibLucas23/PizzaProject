import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './components/layout/Header';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });
import AppContext from './components/AppContext';
import { Toaster } from 'react-hot-toast';
export const metadata = {
	title: 'Nicastro Pizza',
	description: 'developed by Lucas Ribeiro',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className='scroll-smooth'>
			<body className={roboto.className}>
				<main className=' max-w-4xl mx-auto p-4  '>
					<AppContext>
						<Toaster />
						<Header />
						{children}
						<footer className='border-t p-8 text-center mt-16 text-gray-500'>
							&copy 2024 All rights reserved
						</footer>
					</AppContext>
				</main>
			</body>
		</html>
	);
}
