import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function AccountAdd({ auth }: PageProps) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <div className='flex items-center justify-center mt-10'>
                <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white border border-gray-100 rounded-lg shadow-xl'>
                    <div className='max-w-md mx-auto space-y-6'>


                        <form action="{{ route('account') }}" method="post">
                            <h2 className="text-2xl font-bold ">Account</h2>
                            <p className="my-4 opacity-70">Add new account</p>
                            <hr className="my-6" />
                            <InputLabel htmlFor="name" value="name" />
                            <TextInput className="w-full" name="name"></TextInput>

                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput className="w-full" placeholder="Fill with 'xxxx@gmail.com'" name="email">
                            </TextInput>
                            <InputLabel htmlFor="role" value="Role" />
                            <select required
                                className="w-full p-3 mt-2 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none"
                                name="role">
                                <option value="1">Owner</option>
                                <option value="2">Admin</option>
                            </select>
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="flex space-x-3">
                                <TextInput className="w-1/2" placeholder="Fill with min 8 characters" name="password"></TextInput>
                                <TextInput className="w-1/2" placeholder="Confirm Password" name="password_confirmation"></TextInput>
                            </div>
                            <div className="flex mt-2 ">
                                <input type="submit"
                                    className="px-6 py-3 my-2 font-medium text-white duration-300 ease-in-out rounded cursor-pointer bg-emerald-500 hover:bg-indigo-500"
                                    value="Submit" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
