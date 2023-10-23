<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Imports\ProductImport;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function destroy()
    {
        Product::truncate();
        return redirect()->route('product');
    }

    public function index()
    {
        $data = Product::paginate();
        $header = [
            [
                'label' => 'Product name',
                'key-data' => 'product_name'
            ],
            [
                'label' => 'Product Code',
                'key-data' => 'product_code'
            ],
        ];
        return Inertia::render('Product', [
            'table' => [
                'name' => 'List Product',
                'header' => $header,
                'data' => $data
            ]
        ]);
    }

    public function getData()
    {
        return Product::paginate();
    }

    public function store()
    {
        Product::truncate();
        Excel::import(new ProductImport(), request()->file('myFile'));
        return redirect()->route('product');
    }

    public function import()
    {
        return view('pages.product.import');
    }
}
