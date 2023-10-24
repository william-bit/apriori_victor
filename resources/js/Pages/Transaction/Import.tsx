import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";


export default function Import({ auth, table }: PageProps) {
    const { data, setData, post, progress } = useForm<{
        myFile: File | undefined
    }>({
        myFile: undefined,
    })

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post(route('transaction'))
    }
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <div className="grid h-full place-items-center">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                    <h1 className="text-2xl font-bold text-center">
                        <span className="font-normal">Import Transaction</span>
                    </h1>
                    <form className="mt-6" method="post" onSubmit={(e) => submit(e)}>
                        <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                            Import File transaction
                        </label>
                        <a target="_blank" type="submit" href={route('data.excel')}
                            className="py-1 mr-1 font-bold text-blue-800 underline cursor-pointer hover:text-blue-600 ">Downlod
                            upload Format
                            Excel</a>
                        <input id="file" type="file"
                            onChange={e => {
                                e.target.files && setData('myFile', e.target.files[0])
                            }}
                            name="myFile" placeholder="0"
                            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                            required />
                        <button type="submit"
                            className="w-full py-3 mt-2 font-medium tracking-widest text-white uppercase bg-green-600 rounded-md shadow-lg ripple-bg-green-500 ripple focus:outline-none hover:bg-green-700 hover:shadow-none">
                            Submit </button>
                        {/* @if ($errors->first('excel'))
                        <span className="text-red-500">{{ $errors-> first('excel')}} </span>
                        @endif */}
                    </form>
                </div>
            </div>
        </Authenticated>
    )
}


