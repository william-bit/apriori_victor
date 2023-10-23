import Table from '@/Components/Table'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { TableProps } from '@/types/table'

export default function Account({ auth, table }: PageProps<{
    table: TableProps
}>) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <div className="flex justify-center">
                <div className="w-2/3">
                    <div className="text-3xl font-bold mt-7">{table['name']}</div>
                    <div className="flex mt-2 ">
                        <a href={route('account.add')}
                            className="px-5 py-1 mr-1 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600">
                            Add Account
                        </a>
                    </div>
                    <Table {...table} />
                </div>
            </div>
        </ Authenticated>
    )
}
