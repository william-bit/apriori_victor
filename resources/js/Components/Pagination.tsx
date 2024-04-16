import { Data } from "@/types/table";
import { Link } from "@inertiajs/react";
import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationUI } from "./ui/pagination";

interface PaginationProps {
    data: Data
    onPageChange: (page: number) => void;
}

export default function Pagination({ data, onPageChange, }: PaginationProps) {
    const pages = Array.from({ length: data.last_page }, (_, i) => i + 1);
    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                    {data.current_page > 1 && <Link href={data.prev_page_url} onClick={() => onPageChange(data.current_page - 1)} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50`}>Previous</Link>}
                    {data.current_page < data.last_page && <Link href={data.next_page_url} onClick={() => onPageChange(data.current_page + 1)} className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">Next</Link>}
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
                        <PaginationUI>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href={data.prev_page_url} size={"default"} />
                                </PaginationItem>
                                <PaginationItem>
                                    {pages.map((page, index) => {
                                        if (page == data.current_page || [1, data.last_page, data.current_page - 1, data.current_page + 1,].includes(page)) {
                                            return (
                                                <PaginationLink size={"default"} onClick={() => onPageChange(page)} key={page} href={data.path + "?page=" + page} aria-current="page">{page}</PaginationLink>
                                            )
                                        }
                                    })}
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href={data.next_page_url} size={"default"} />
                                </PaginationItem>
                            </PaginationContent>
                        </PaginationUI>
                    </div>
                </div>
            </div >
        </>
    )
}

