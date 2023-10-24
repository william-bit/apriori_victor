import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { TableProps } from "@/types/table";

export default function Recommendation({ auth, tableRecommendation }: PageProps<{
    tableRecommendation: TableProps
}>) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
            }>
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="flex justify-between mt-10">
                        <div className="text-3xl font-bold mt-7">{ } </div>
                        <div className="flex space-x-2">
                            <a href={route('algorithm.start')}
                                className="px-6 py-3 my-2 ml-3 font-medium text-white duration-300 ease-in-out bg-gray-500 cursor-pointer ripple-bg-gray-300 hover:bg-gray-600">
                                Start Algorithm
                            </a>
                            <a className="px-6 py-3 my-2 font-medium text-white duration-300 ease-in-out cursor-pointer ripple-bg-slate-300 bg-slate-500 hover:bg-slate-700"
                                href={route('algorithm.export')}>Export</a>

                        </div>
                    </div>
                    <Table {...tableRecommendation} />
                </div>
            </div>
        </Authenticated>
    )
}
