<x-app-layout>
    <div class="grid h-full place-items-center">
        <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
            <h1 class="text-2xl font-bold text-center">
                <span class="font-normal">Import Product</span>
            </h1>
            <form class="mt-6" method="post" enctype="multipart/form-data" action="{{ route('product') }}">
                @csrf
                <label class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                    Import File Product
                </label>
                <input id="file" type="file" name="myFile" placeholder="0" step="0.01" max="1"
                    min="0"
                    class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required />
                <button type="submit"
                    class="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-green-600 rounded-md shadow-lg focus:outline-none hover:bg-green-700 hover:shadow-none">
                    Submit </button>
            </form>
        </div>
    </div>
</x-app-layout>
