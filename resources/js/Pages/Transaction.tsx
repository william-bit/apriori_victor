import { DatePicker } from "@/Components/DatePicker";
import Island from "@/Components/Island";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { TableProps } from "@/types/table";
import { useForm } from "@inertiajs/react";
import { DateTime } from "luxon";

export default function Transaction({ auth, table, filter }: PageProps<{
    table: TableProps
    filter: {
        from: string,
        until: string
    }
}>) {
    const { data, setData, get, progress, errors } = useForm<{
        from?: string,
        until?: string
    }>(
        { ...filter }
    )

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        get(route('data'))
    }
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Island className="p-4 ">
                <div className="w-full">
                    <div className="text-3xl font-bold mt-7">{table.name}</div>
                    <form onSubmit={e => submit(e)} method="GET" className="flex flex-wrap h-full">
                        <a href={route('data.import')} className="flex items-center justify-center h-10 px-5 py-1 mr-1 font-bold text-white bg-green-500 rounded-lg cursor-pointer whitespace-nowrap hover:bg-green-600" type="button">
                            Add Transaction
                        </a>
                        <DatePicker className="mr-1" value={filter['from'] ? new Date(filter['from']) : undefined} onChange={(e) => { setData('from', e && DateTime.fromJSDate(e).setZone('system').toFormat('yyyy-MM-dd')); }} />
                        <DatePicker className="mr-1" value={filter['until'] ? new Date(filter['until']) : undefined} onChange={(e) => { setData('until', e && DateTime.fromJSDate(e).setZone('system').toFormat('yyyy-MM-dd')); }} />
                        <button type="submit" value="submit" className="h-10 px-8 mr-1 text-base font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-500 rounded-lg shadow-md outline-none p y-3 active:bg-gray-600 hover:shadow-lg focus:outline-none">Filter</button>
                        <a href={route('data')} className="flex items-center justify-center h-10 px-5 py-1 mr-1 font-bold text-white bg-yellow-500 rounded-lg cursor-pointer whitespace-nowrap hover:bg-yellow-600">
                            <div> Clear Filter</div>
                        </a>
                        <a href={route('data.destroy')} className="flex items-center justify-center h-10 px-5 py-1 mr-1 font-bold text-white bg-red-500 rounded-lg cursor-pointer whitespace-nowrap hover:bg-red-600">
                            <div> Clear Data</div>
                        </a>
                    </form>
                </div>
                <Table {...table} paginate={<Pagination data={table.data} onPageChange={(page) => console.log(page)} />}></Table>
            </Island>
        </Authenticated >
    )
}

