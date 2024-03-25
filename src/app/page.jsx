import Image from 'next/image';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import HomeMenu from './components/layout/HomeMenu';
import SectionHeaders from './components/layout/SectionHeaders';

export default function Home() {
	return (
		<>
			<Hero />
			<HomeMenu />
			<section className='text-center my-16' id='about'>
				<SectionHeaders
					subHeader={'Our Story'}
					mainHeader={'About us'}
				/>
				<div className='text-gray-500 max-w-md mx-auto mt-4  flex flex-col gap-4'>

					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos qui mollitia adipisci nemo velit unde! Maxime quidem, voluptate illo iste odit similique labore nobis.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos qui mollitia adipisci nemo velit unde! Maxime quidem, voluptate illo iste odit similique labore nobis.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quos qui mollitia adipisci nemo velit unde! Maxime quidem.
					</p>
				</div >
			</section>
			<section className='text-center my-16' id='contact' >
				<SectionHeaders
					subHeader={'don\'t hesitate '}
					mainHeader={'Contact us'}
				/>
				<div className='mt-8'>

					<a className='text-4xl underline text-gray-500' href="tel:+541134186228"> +54 11 3418-6228</a>
				</div>
			</section>


		</>
	);
}
