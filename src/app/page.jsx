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
						Serving up piping hot slices of satisfaction straight to your doorstep, Nicastro Pizza Delivery is your ultimate go-to for a delicious meal without the hassle. With a menu bursting with mouthwatering options, from traditional Margherita to bold BBQ Chicken, we're dedicated to delivering flavors that delight.
					</p>
					<p>
						Our commitment to quality starts with handcrafted dough made fresh daily, topped with premium ingredients that elevate every bite. Whether you're craving a quick lunch, a family dinner, or a late-night snack, Nicastro Pizza Delivery is just a phone call away, ensuring that every moment is filled with savory satisfaction. Experience the convenience and crave-worthy taste of Nicastro Pizza Delivery today!
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
