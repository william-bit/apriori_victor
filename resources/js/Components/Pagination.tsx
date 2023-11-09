import { Data } from "@/types/table";
import { Link } from "@inertiajs/react";

interface PaginationProps {
    data: Data
    onPageChange: (page: number) => void;
}

export default function Pagination({ data, onPageChange, }: PaginationProps) {
    const pages = Array.from({ length: data.last_page }, (_, i) => i + 1);
    return (
        <>
            <nav className="flex justify-center mt-6" >
                <ul className="pagination">
                </ul>
            </nav>
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                    {data.current_page > 1 && <Link href={data.prev_page_url} onClick={() => onPageChange(data.current_page - 1)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50`}>Previous</Link>}
                    {data.current_page < data.last_page && <Link href={data.next_page_url} onClick={() => onPageChange(data.current_page + 1)} className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Next</Link>}
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div className="flex space-x-1 text-sm text-gray-700">
                        <span>Showing</span>
                        <span className="font-medium">{((data.current_page - 1) * data.per_page) + 1}</span>
                        <span>to</span>
                        <span className="font-medium">{data.current_page * data.per_page}</span>
                        <span>of</span>
                        <span className="font-medium">{data.total}</span>
                        <span>results</span>
                    </div>
                    <div>
                        <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                            <Link href={data.prev_page_url} className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                </svg>
                            </Link>
                            {pages.map((page, index) => {
                                if (index == 3) {
                                    return <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                                }
                                if (index < 3 || index > pages.length - 3) {
                                    return (<Link onClick={() => onPageChange(page)} key={page} href={data.path + "?page=" + page} aria-current="page" className={`${data.current_page === page ? 'text-white bg-indigo-600 focus-visible:outline-indigo-600 font-semibold text-sm relative z-10 inline-flex items-center px-4 py-2  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2' : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'} `}>{page}</Link>)
                                }
                            })}
                            <Link href={data.next_page_url} className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div >
        </>
    )
}

