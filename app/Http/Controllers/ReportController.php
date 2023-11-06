<?php
namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\AssociationRule;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    private $product;

    public function getProduct()
    {
        $this->product = Product::get()->toArray();
    }

    public function changeCodeProducts($jsonArray)
    {
        $keyList = array_column($this->product, 'product_code');

        $products = [];

        foreach ($jsonArray as $value) {
            $key = array_search($value, $keyList);

            if ($key !== false) {
                $products[] = $this->product[$key]['product_name'];
            }
        }

        return $products;
    }

    public function index(Request $request)
    {
        $from = $request->from;

        $until = $request->until;

        return Inertia::render('Report', [

            'filter' => [

                'from' => $from,

                'until' => $until

            ],

        ]);
    }

    public function export()
    {
        $this->getProduct();

        // Update jika mau ganti/nambah limit data yang akan dipdfkan dan diurutkan sesuai confidence (gabungan)

        $dataAssociation = AssociationRule::limit(5)->orderBy('confidence', 'desc')->get();

        // $dataAssociation = AssociationRule::limit(5)->get();

        foreach ($dataAssociation as &$datum) {
            $datum['support'] = round($datum->support * 100, 2) . '%';

            $datum['confidence'] = round($datum->confidence * 100, 2) . '%';

            $datum['consequentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->consequent)));

            $datum['antecedentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->antecedent)));
        }

        $pdf = Pdf::loadView('reportTopFive', [

            'title' => 'Report Top Five',

            'data' => $dataAssociation,

            // 'image' => base64_encode(Storage::disk('public')->get('logo.png'))

        ]);

        return $pdf->stream();

        // return $pdf->download('salaryHistory' . $monthName . '.pdf');
    }

    public function transaction(Request $request)
    {
        $data = new Transaction();

        $from = $request->from;

        $until = $request->until;

        $diff = date_diff(date_create($from), date_create($until . ' 23:59:59'));

        if (($diff->format('%a') + 1) <= 31) {
            if ($from) {
                $data = $data->where('date_invoice', '>=', $from);
            }

            if ($until) {
                $data = $data->where('date_invoice', '<', $until . ' 23:59:59');
            }

            $data = $data->select(['product_code', 'product_name', DB::raw('count(*) as product_sum')])->groupBy(['product_code', 'product_name'])->get();

            foreach ($data as &$item) {
                $item->date_invoice = Carbon::parse($item->date_invoice)->format('Y-m-d');
            }

            $pdf = Pdf::loadView('reportTransaction', [

                'title' => 'Report Transaction',

                'data' => $data,

            ]);

            return $pdf->stream();
        } else {
            return Inertia::render('Report', [

                'error' => 'Filter tidak boleh lebih dari 31 hari',

                'filter' => [

                    'from' => $from,

                    'until' => $until

                ],

            ]);
        }
    }

    public function product()
    {
        $data = Product::get();

        $pdf = Pdf::loadView('reportProduct', [

            'title' => 'Report Product',

            'data' => $data,

        ]);

        return $pdf->stream();
    }

    public function result()
    {
        $this->getProduct();

        // $dataAssociation = AssociationRule::limit(5)->orderBy('confidence', 'desc')->get();

        $dataAssociation = AssociationRule::limit(5)->get();

        foreach ($dataAssociation as &$datum) {
            $datum['support'] = round($datum->support * 100, 2) . '%';

            $datum['confidence'] = round($datum->confidence * 100, 2) . '%';

            $datum['consequentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->consequent)));

            $datum['antecedentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->antecedent)));

            // if (

            //     $datum['antecedentConcat'] == "MMC" &&

            //     $datum['consequentConcat'] == "MTKN/O/N"

            // ) {

            //     $datum['support'] = "24.2" . "%";

            //     $datum['confidence'] = "78.9" . "%";

            // }

            // if (

            //     $datum['antecedentConcat'] == "MT3TS" &&

            //     $datum['consequentConcat'] == "MSK"

            // ) {

            //     $datum['support'] = "26.8" . "%";

            //     $datum['confidence'] = "79.8" . "%";

            // }
        }

        $pdf = Pdf::loadView('reportResult', [

            'title' => 'Report Pembandingan hasil',

            'data' => $dataAssociation,

            // 'image' => base64_encode(Storage::disk('public')->get('logo.png'))

        ]);

        return $pdf->stream();

        // return $pdf->download('salaryHistory' . $monthName . '.pdf');
    }
}
