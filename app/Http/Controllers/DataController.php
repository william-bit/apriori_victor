<?php
namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function destroy()
    {
        Transaction::truncate();
        return redirect()->route('data');
    }

    public function index(Request $request)
    {
        $data = new Transaction();
        $from = $request->from;
        $until = $request->until;
        if ($from) {
            $data = $data->where('date_invoice', '>=', $from);
        }
        if ($until) {
            $data = $data->where('date_invoice', '<', $until . ' 23:59:59');
        }
        $data = $data->paginate()->appends(request()->query());
        foreach ($data as &$item) {
            $item->date_invoice = Carbon::parse($item->date_invoice)->format('Y-m-d');
        }
        $header = [
            [
                'label' => 'Invoice Number',
                'key-data' => 'no_invoice'
            ],
            [
                'label' => 'Transaction Date',
                'key-data' => 'date_invoice'
            ],
            [
                'label' => 'List Purchase',
                'key-data' => 'product_name'
            ],
        ];
        return Inertia::render('Transaction', [
            'filter' => [
                'from' => $from,
                'until' => $until
            ],
            'table' => [
                'name' => 'Table Data',
                'header' => $header,
                'data' => $data
            ]
        ]);
    }

    public function import()
    {
        return Inertia::render('Transaction/Import');
    }

    public function exportExcel()
    {
        return response()->download(storage_path('app/example/sample.xlsx'));
    }
}
