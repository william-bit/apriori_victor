import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";

export default function Config({ auth, confidence, support }: PageProps<{
    confidence: string,
    support: string
}>) {
    const { data, setData, post, progress, errors } = useForm<{
        support: string,
        confidence: string
        message?: string
    }>({
        support: support,
        confidence: confidence
    })


    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post(route('apriori'))
    }
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <div className='flex items-center justify-center mt-10'>
                <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white border border-gray-100 shadow-xl'>
                    <div className='max-w-md mx-auto space-y-6'>


                        <form onSubmit={e => submit(e)} method="post">
                            <h2 className="text-2xl font-bold ">Apriori Setting</h2>
                            <p className="my-4 opacity-70">This Is setting for setup apriori Confidence and support</p>
                            <hr className="my-6" />
                            <label className="text-sm font-bold uppercase opacity-70">Minimum Confidence</label>
                            <input type="number" step="0.01" max="1" min="0.1" name="confidence"
                                value={data.confidence}
                                onChange={e => setData('confidence', e.target.value)}
                                className="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none" />
                            <label className="text-sm font-bold uppercase opacity-70">Minimum Support</label>
                            <input type="number" step="0.01" max="1" min="0.1" name="support"
                                value={data.support}
                                onChange={e => setData('support', e.target.value)}
                                className="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none" />
                            <div className="flex mt-2 " />
                            <input type="submit"
                                className="px-6 py-3 my-2 font-medium text-white duration-300 ease-in-out rounded cursor-pointer bg-emerald-500 hover:bg-indigo-500"
                                value="Submit Setting change" />
                        </form>
                        {
                            errors.message && <span className="text-red-500">{errors.message} </span>
                        }
                    </div>
                </div>
            </div>
        </Authenticated >
    )
}
