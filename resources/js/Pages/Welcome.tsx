import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const [showResponsiveNavLink, setResponsiveNavLink] = useState(false);
    const listMenu = [
        { label: 'Home', href: route('welcome'), active: route().current('welcome') },
        { label: 'Dashboard', href: route('dashboard'), active: route().current('dashboard') },
    ]
    return (
        <>
            <Head title="Welcome" />
            <nav>
                <div
                    className="flex items-center justify-between w-full px-6 py-2"
                >
                    <a
                        className="text-2xl font-bold lg:text-4xl"
                        href="#"
                    >
                    </a>
                    <div className="block lg:hidden">
                        <button
                            onClick={() => setResponsiveNavLink(state => !state)}
                            className="flex items-center px-3 py-2 text-gray-500 border border-gray-600 rounded appearance-none hover:text-gray-800 hover:border-teal-500 focus:outline-none"
                        >
                            <svg
                                className="w-3 h-3 fill-current"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                    <div className={`hidden lg:block`}>
                        <ul className="inline-flex">
                            <li>
                                <Link className="px-4 font-bold" href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link className="px-4 hover:text-gray-800" href="#"
                                >About</Link>
                            </li>
                            <li>
                                <Link className="px-4 hover:text-gray-800" href="#">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                showResponsiveNavLink && <div>
                    <div className="pt-2 pb-3 space-y-1">
                        {
                            listMenu.map(value => (
                                <ResponsiveNavLink key={value.label} href={value.href} active={value.active}>
                                    {value.label}
                                </ResponsiveNavLink>
                            ))
                        }
                    </div>
                </div>
            }
            <div
                className="py-20"
                style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
            >
                <div className="container px-6 mx-auto">
                    <h2 className="mb-2 text-4xl font-bold text-white">
                        Toko Plastik Kembar jaya
                    </h2>
                    <h3 className="mb-8 text-2xl text-gray-200">
                        Menyediakan kantong plastik PP ,plastik PE, kantong HD dan pelengkapan kue
                    </h3>
                    <a
                        className="px-8 py-4 font-bold tracking-wider uppercase bg-white rounded-full shadow-lg"
                        href={route('dashboard')}
                    >
                        Go To dashboard
                    </a>
                </div>
            </div>
            <section className="p-10 px-6 mx-auto">
                <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">
                    Menjual
                </h2>
                {
                    [
                        { title: "Kantong HD", image: "/storage/image/kantong-hd.jpg", description: "Our Smart Health Monitoring Wristwatch is able to capture you vitals while you exercise. You can create different category of exercises and can track your vitals on the go." },
                        { title: "Kantong PP", image: "/storage/image/kantong-pp.webp", description: "Our Smart Health Monitoring Wristwatch allows you to sync data across all your mobile devices whether iOS, Android or Windows OS and also to your laptop whether MacOS, GNU/Linux or Windows OS." },
                        { title: "Kantong PE", image: "/storage/image/kantong-pe.jpg", description: "Our Smart Health Monitoring Wristwatch allows you to sync data across all your mobile devices whether iOS, Android or Windows OS and also to your laptop whether MacOS, GNU/Linux or Windows OS." },
                    ].map(value => (
                        <div className="flex items-center justify-center mb-20 space-x-5">
                            <div className="flex flex-col w-1/3">
                                <h4 className="mb-3 text-3xl font-bold text-gray-800">
                                    {value.title}
                                </h4>
                                <p className="mb-8 text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                            <div>
                                <img src={value.image} alt={value.title + " image"} className='rounded w-80' />
                            </div>
                        </div>
                    ))
                }
            </section>
            <section className="bg-gray-100">
                <div className="container px-6 py-20 mx-auto">
                    <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">
                        Testimonials
                    </h2>
                    <div className="flex flex-wrap">
                        <div className="w-full px-2 mb-4 md:w-1/3">
                            <div className="py-2 bg-white rounded shadow">
                                <p className="px-6 mb-5 text-base text-gray-800">
                                    Monitoring and tracking my health vitals anywhere I go and on
                                    any platform I use has never been easier.
                                </p>
                                <p className="px-6 text-xs text-gray-500 md:text-sm">
                                    John Doe
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-4 md:w-1/3">
                            <div className="py-2 bg-white rounded shadow">
                                <p className="px-6 mb-5 text-base text-gray-800">
                                    As an Athlete, this is the perfect product for me. I wear my
                                    Smart Health Monitoring Wristwatch everywhere I go, even in the
                                    bathroom since it's waterproof.
                                </p>
                                <p className="px-6 text-xs text-gray-500 md:text-sm">
                                    Jane Doe
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-2 mb-4 md:w-1/3">
                            <div className="py-2 bg-white rounded shadow">
                                <p className="px-6 mb-5 text-base text-gray-800">
                                    I don't regret buying this wearble gadget. One of the best
                                    gadgets I own!.
                                </p>
                                <p className="px-6 text-xs text-gray-500 md:text-sm">
                                    James Doe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ backgroundColor: '#667eea' }}>
                <div className="container px-6 py-20 mx-auto text-center">
                    <h2 className="mb-6 text-4xl font-bold text-center text-white">
                        Apa yang anda tunggu?
                    </h2>
                    <h3 className="my-4 text-2xl text-white">
                        Datang ke toko kami sekarang
                    </h3>
                    <button
                        className="px-8 py-4 mt-6 font-bold tracking-wider uppercase bg-white rounded-full shadow-lg"
                    >
                        Lokasi
                    </button>
                </div>
            </section>
            <footer className="bg-gray-100">
                <div className="container px-6 pt-10 pb-6 mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full text-center md:w-1/4 md:text-left ">
                            <h5 className="mb-6 font-bold uppercase">Links</h5>
                            <ul className="mb-4">
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >FAQ</a >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Help</a >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Support</a >
                                </li>
                            </ul>
                        </div>
                        <div className="w-full text-center md:w-1/4 md:text-left ">
                            <h5 className="mb-6 font-bold uppercase">Legal</h5>
                            <ul className="mb-4">
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Terms</a >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Privacy</a >
                                </li>
                            </ul>
                        </div>
                        <div className="w-full text-center md:w-1/4 md:text-left ">
                            <h5 className="mb-6 font-bold uppercase">Social</h5>
                            <ul className="mb-4">
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Facebook</a >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Linkedin</a >
                                </li>
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Twitter</a >
                                </li>
                            </ul>
                        </div>
                        <div className="w-full text-center md:w-1/4 md:text-left ">
                            <h5 className="mb-6 font-bold uppercase">Company</h5>
                            <ul className="mb-4">
                                <li className="mt-2">
                                    <a
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Official Blog</a >
                                </li>
                                <li className="mt-2">
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >About Us</Link>
                                </li>
                                <li className="mt-2">
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:underline hover:text-orange-500"
                                    >Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
