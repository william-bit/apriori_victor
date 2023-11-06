<?php
namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Product;
use App\Models\Transaction;
use App\Imports\TransactionImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TransactionController extends Controller
{
    public function index()
    {
        Transaction::truncate();
        Product::query()->truncate();
        $data = Excel::toArray(new TransactionImport(), request()->file('myFile'));
        unset($data[0][0]);
        foreach ($data[0] as $key => &$item) {
            try {
                $item[0] = Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($item[0]))
                    ->format('Y-m-d');
                unset($item);
            } catch (\Throwable $th) {
                throw ValidationException::withMessages(['myFile' => 'Your format aren\'t match in Row : ' . ($key + 1) . ' Column : 1 please check again your file same as file example provided']);
            }
        }
        $validator = Validator::make($data[0], [
            '*.0' => 'required|date',
            '*.1' => 'required|string',
            '*.2' => 'required|string',
            '*.3' => 'required|string',
            '*.4' => 'required|numeric',
            '*.5' => 'required|numeric',
            '*.6' => 'required|string',
        ]);
        if ($validator->fails()) {
            foreach ($validator->errors()->messages() as $key => $item) {
                $coordinate = explode('.', $key);
                throw ValidationException::withMessages(['myFile' => 'Your format aren\'t match in Row : ' . ($coordinate[0] + 1) . ' Column :' . ($coordinate[1] + 1) . ' please check again your file same as file example provided']);
            }
        }
        foreach ($data[0] as $row) {
            Transaction::query()->create([
                'date_invoice' => $row[0],
                'no_invoice' => $row[1],
                'product_code' => $row[2],
                'product_name' => $row[3],
            ]);
            Product::query()->firstOrCreate([
                'product_code' => $row[2],
            ], [
                'product_name' => $row[3],
                'price' => 0,
                'unit' => 'pcs'
            ]);
        }
        return redirect()->route('data');
    }

    public function getData()
    {
        return Transaction::limit(100)->get();
    }
}
