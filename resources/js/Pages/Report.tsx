import Island from '@/Components/Island'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { useForm } from '@inertiajs/react'

export default function Report({ auth, filter, error }: PageProps<{
    filter: {
        until: string,
        from: string,
    }
    error: string
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
            <Island className='py-10'>
                <div className="flex justify-center">
                    <div className="w-2/3">
                        <div className="text-3xl font-bold mt-7">Download Report</div>
                        <div className="flex mt-2 ">
                            <a href={route('report.topFive')}
                                className="px-5 py-1 mr-1 font-bold text-white bg-blue-500 cursor-pointer hover:bg-blue-600">
                                Report Top 5 Item
                            </a>
                            <a href={route('report.product')}
                                className="px-5 py-1 mr-1 font-bold text-white bg-blue-500 cursor-pointer hover:bg-blue-600">
                                Report Data Item
                            </a>
                            {/* <a href={route('report.result')}
                                className="px-5 py-1 mr-1 font-bold text-white bg-blue-500 cursor-pointer hover:bg-blue-600">
                                Report Result Comparison
                            </a> */}
                        </div>
                        <div className="h-10 mt-3">
                            {error && <span className="text-red-600">{error}</span>}
                            <form method="GET" action={route('report.transaction')} className="flex h-full">
                                <input type="date" name="from" value={data['from']} onChange={(e) => setData('from', e.target.value)} required
                                    className="px-5 py-1 mr-1 font-bold bg-white border cursor-pointer outline-0 hover:border-gray-400 hover:bg-gray-100" />
                                <input type="date" name="until" value={data['until']} onChange={(e) => setData('until', e.target.value)} required
                                    className="px-5 py-1 mr-1 font-bold bg-white border cursor-pointer outline-0 hover:border-gray-400 hover:bg-gray-100" />
                                <button type="submit"
                                    className="px-5 py-1 mr-1 font-bold text-white bg-blue-500 border cursor-pointer hover:bg-blue-600">
                                    Report Sales</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Island>
        </Authenticated>
    )
}
