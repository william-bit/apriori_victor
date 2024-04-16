import { TableProps } from "@/types/table"

export default function Table(props: TableProps) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center">
                            <thead className="border bg-stone-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-sm font-medium ">
                                        NO
                                    </th>
                                    {
                                        props.header.map(header => (
                                            <th key={header["key-data"]} scope="col" className="px-6 py-4 text-sm font-medium ">
                                                {header['label']}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead >
                            <tbody>
                                {props.data.data.length == 0 && <tr className="border-b bg-stone-50">
                                    <td
                                        colSpan={props.header.length + 1}
                                        className="px-6 py-4 text-sm font-medium text-gray-900 border whitespace-nowrap">
                                        No Data
                                    </td>
                                </tr>}
                                {
                                    props.data.data.map((datum, key) => (

                                        <tr className="border-b border-l border-r even:bg-stone-50 hover:bg-stone-100">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                {key + 1 + (props.data.current_page - 1) * props.data.per_page}
                                            </td>
                                            {
                                                props.header.map((header) => (
                                                    <td
                                                        key={header.label}
                                                        className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                        {
                                                            header.action == "delete" && (
                                                                <a href={header['href'] + '/' + datum[header['key-data']]}
                                                                    className="flex justify-center w-full cursor-pointer">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                                        className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                                            d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </a>
                                                            )
                                                        }
                                                        {
                                                            header.action == 'edit' && (
                                                                <a href={header['href'] + '/' + datum[header['key-data']]}
                                                                    className="flex justify-center w-full cursor-pointer">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                                        className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </a>
                                                            )
                                                        }
                                                        {!header.action && datum[header['key-data']]}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {props.paginate}
        </div>
    )
}
