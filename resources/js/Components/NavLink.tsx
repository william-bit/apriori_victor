import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({ active = false, icon = undefined, className = '', children, ...props }: InertiaLinkProps & { active: boolean, icon?: React.JSX.Element }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 focus:text-white hover:text-white hover:bg-gray-800 rounded-lg p-1 text-center text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-gray-900 focus:bg-gray-900 '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            <div className="flex items-center space-x-3">
                <div className='flex content-center h-4'>
                    {icon}
                </div>
                <div> {children} </div>
            </div>
        </Link>
    );
}
