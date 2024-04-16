import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { User } from '@/types';
import { AdjustmentsHorizontalIcon, CircleStackIcon, DocumentTextIcon, HomeIcon, Squares2X2Icon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    console.log(route().current())
    const listMenu = [
        { label: 'Dashboard', icon: <HomeIcon className='w-full h-full' />, href: route('dashboard'), active: route().current('dashboard') },
        { label: 'Data ', icon: <CircleStackIcon className='w-full h-full' />, href: route('data'), active: route().current('data') },
        { label: 'Config', icon: <AdjustmentsHorizontalIcon className='w-full h-full' />, href: route('config'), active: route().current('config') },
        { label: 'Product', icon: <Squares2X2Icon className='w-full h-full' />, href: route('products'), active: route().current('products') },
        { label: 'Recommendation', icon: <TrophyIcon className='w-full h-full' />, href: route('recommendation'), active: route().current('recommendation') },
        { label: 'Report', icon: <DocumentTextIcon className='w-full h-full' />, href: route('report'), active: route().current('report') },
        // { label: 'Whitelist', href: route('whitelist'), active: route().current('whitelist') },
        { label: 'Account', icon: <UserGroupIcon className='w-full h-full' />, href: route('account'), active: route().current('accounts') },
    ]
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className='hidden sm:block h-screen border-r border-gray-300 w-52 p-3 bg-[#f8f4f3] '>
                <ApplicationLogo className="block w-auto h-8 text-gray-800 border-b border-gray-700 fill-current" />
                <div className='mt-3'>
                    {header && (
                        <header >
                            <div className="grid grid-cols-1">
                                {
                                    listMenu.map(value => (
                                        <NavLink icon={value.icon} key={value.label} href={value.href} active={value.active}>
                                            {value.label}
                                        </NavLink>
                                    ))
                                }
                            </div>
                        </header>
                    )}
                </div>
            </div>
            <div className='w-full'>
                <nav className="bg-[#f8f4f3] border-b border-gray-300">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between w-full h-16">
                            <div className="flex">
                                <div className="flex items-center shrink-0">
                                    <Link href="/">
                                        {listMenu.find(value => value.active) && <span className='ml-2 text-lg font-semibold text-gray-700'>{listMenu.find(value => value.active)?.label}</span>}
                                    </Link>
                                </div>

                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="relative ml-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="flex items-center -mr-2 sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                                >
                                    <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            {
                                listMenu.map(value => (
                                    <ResponsiveNavLink key={value.label} href={value.href} active={value.active}>
                                        {value.label}
                                    </ResponsiveNavLink>
                                ))
                            }
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className='p-5'>{children}</main>
            </div>


        </div >
    );
}
