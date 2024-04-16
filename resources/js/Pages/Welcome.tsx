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
        <div className='h-screen'>
            <Head title="Welcome" />
            <nav className='sticky top-0 border-b bg-stone-50'>
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
                    <div className={`hidden lg:block `}>
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
            <div className="bg-[#f8f4f3]">
                <div className="flex items-center justify-between px-5 py-28">
                    <div className="w-1/2">
                        <h2 className="text-5xl font-semibold text-gray-800">Apriori Application</h2>
                        <h3 className="mt-4 text-xl font-semibold text-gray-600">Penerapan Algoritma Apriori dalam Aplikasi</h3>
                        <p className="mt-4 text-gray-600">Aplikasi ini menggunakan algoritma Apriori untuk menentukan rekomendasi item terbaik yang dapat di gunakan dalam keputusan bisnis</p>
                    </div>
                    <div className="w-1/2">
                        <img src="https://www.emprenderconactitud.com/img/fidelizamas.png" alt="Imagen relacionada con el programa de fidelización" className="w-full h-auto" />
                    </div>
                </div>
            </div>
            <div
                className="py-20"
                style={{ background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)' }}
            >

            </div>
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
        </div>
    );
}
