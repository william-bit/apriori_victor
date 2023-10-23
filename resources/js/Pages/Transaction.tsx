import Island from "@/Components/Island";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { TableProps } from "@/types/table";

export default function Transaction({ auth, table }: PageProps<{
    table: TableProps
}>) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Island className="p-4 ">
                <div className="flex justify-center">
                    <div className="w-2/3">
                        <div className="text-3xl font-bold mt-7">{table.name}</div>
                        <div className="flex mt-2">
                            <a href={route('data.import')} className="flex items-center justify-center px-5 py-1 mr-1 font-bold text-white bg-blue-500 rounded cursor-pointer whitespace-nowrap hover:bg-blue-600">
                                <span>Add Transaction</span>
                            </a>
                            <form method="GET" action="{{ route('data') }}" className="flex h-full">
                                <input type="date" name="from" value="{{ $filter['from'] }}" onChange={(e) => console.log(e)} className="px-5 py-1 mr-1 font-bold bg-white border rounded cursor-pointer outline-0 hover:border-gray-400 hover:bg-gray-100" />
                                <input type="date" name="until" value="{{ $filter['until'] }}" onChange={(e) => console.log(e)} className="px-5 py-1 mr-1 font-bold bg-white border rounded cursor-pointer outline-0 hover:border-gray-400 hover:bg-gray-100" />
                                <button type="submit" value="submit" className="px-5 py-1 mr-1 font-bold text-white bg-green-500 border rounded cursor-pointer hover:bg-green-600">Filter</button>
                                <a href="{{ route('data') }}" className="flex items-center justify-center px-5 py-1 mr-1 font-bold text-white bg-yellow-500 rounded cursor-pointer whitespace-nowrap hover:bg-yellow-600">
                                    <div> Clear Filter</div>
                                </a>
                                <a href="{{ route('data.destroy') }}" className="flex items-center justify-center px-5 py-1 mr-1 font-bold text-white bg-red-500 rounded cursor-pointer whitespace-nowrap hover:bg-red-600">
                                    <div> Clear Data</div>
                                </a>
                            </form>
                        </div>
                        <Table {...table}></Table>
                    </div>
                </div>
            </Island>
        </Authenticated >
    )
}
