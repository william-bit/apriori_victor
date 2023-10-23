<x-app-layout>
    <div class='flex items-center justify-center mt-10'>
        <div class='w-full max-w-lg px-10 py-8 mx-auto bg-white border border-gray-100 rounded-lg shadow-xl'>
            <div class='max-w-md mx-auto space-y-6'>


                <form action="{{ route('whitelist') }}" method="post">
                    @csrf
                    <h2 class="text-2xl font-bold ">Whitelist Setting</h2>
                    <p class="my-4 opacity-70">Add whitelist to account</p>
                    <hr class="my-6">
                    <label class="text-sm font-bold uppercase opacity-70">List Account</label>
                    <select name="user"
                        class="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none">
                        @foreach ($users as $user)
                            <option value="{{ $user->id }}">{{ $user->name }}</option>
                        @endforeach
                    </select>
                    <label class="text-sm font-bold uppercase opacity-70">Set Role</label>
                    <select name="role"
                        class="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none">
                        <option value="0">IT Developer</option>
                        <option value="1">Admin</option>
                        <option value="2">Manager</option>
                        <option value="3">Owner</option>
                    </select>
                    <div class="flex mt-2 ">
                        <input type="submit"
                            class="px-6 py-3 my-2 font-medium text-white duration-300 ease-in-out rounded cursor-pointer bg-emerald-500 hover:bg-indigo-500"
                            value="Submit">
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
