<?php
namespace App\Http\Controllers;

use App\Models\Rule;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\AssociationRule;
use Barryvdh\DomPDF\Facade\Pdf;

class RecommendationController extends Controller
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

    public function index()
    {
        $rule = Rule::find(1);
        if (empty($rule)) {
            $support = 0;
            $confidence = 0;
        } else {
            $support = $rule->support;
            $confidence = $rule->confidence;
        }

        $this->getProduct();
        // Penting (JOJO)
        // Untuk Mengurutkan Hasil data yg telah diproses pada recommendation, dari confiedence tertinggi
        // $dataAssociation = AssociationRule::query()->orderBy("confidence","desc")->paginate(50, ["*"], "assoc");

        // Untuk limit Hasil data yg telah diproses pada recommendation, Menjadi 10 data. Ganti disamping paginate(50,..) menjadi Paginate(10,..)
        // $dataAssociation = AssociationRule::paginate(10, ["*"], "assoc");

        // Gabungan jadi gini (Paginate yang dihilangkan/ diganti, jadi tidak ditambahkan limit())
        $dataAssociation = AssociationRule::query()->orderBy('confidence', 'desc')->paginate(10, ['*'], 'assoc');
        // // UMUM
        // $dataAssociation = AssociationRule::paginate(50, ["*"], "assoc");
        foreach ($dataAssociation as &$datum) {
            $datum['support'] = round($datum->support * 100, 2) . '%';
            $datum['confidence'] = round($datum->confidence * 100, 2) . '%';
            $datum['consequentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->consequent)));
            $datum['antecedentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->antecedent)));
            // if (
            //     $datum['antecedentConcat'] == "(MMC)" &&
            //     $datum['consequentConcat'] == "(MTKN/O/T)"
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
        $data = Product::paginate(15, ['*'], 'product');
        $header = [
            'ProductCode' => [
                'label' => 'Products Code',
                'key-data' => 'product_code'
            ],
            'ProductName' => [
                'label' => 'Products Name',
                'key-data' => 'product_name'
            ],
        ];
        $headerRecommendation = [
            [
                'label' => 'First Item',
                'key-data' => 'antecedentConcat'
            ],
            [
                'label' => 'Second Item',
                'key-data' => 'consequentConcat'
            ],
            [
                'label' => 'Support',
                'key-data' => 'support'
            ],
            [
                'label' => 'Confidence',
                'key-data' => 'confidence'
            ]
        ];
        return Inertia::render('Recommendation', [
            'confidence' => $confidence,
            'support' => $support,
            'table' => [
                'button' => [
                    'add' => [
                        'enable' => true
                    ],
                    'edit' => [
                        'enable' => true
                    ],
                    'delete' => [
                        'enable' => true
                    ],
                ],
                'name' => 'List Product',
                'header' => $header,
                'data' => $data
            ],
            'tableRecommendation' => [
                'button' => [
                    'add' => [
                        'enable' => true
                    ],
                    'edit' => [
                        'enable' => true
                    ],
                    'delete' => [
                        'enable' => true
                    ],
                ],
                'name' => 'Association Rule Report',
                'header' => $headerRecommendation,
                'data' => $dataAssociation
            ]
        ]);
    }

    public function export()
    {
        $this->getProduct();

        // Untuk Mengurutkan dari Confidience tertinggi pada Report
        // $dataAssociation = AssociationRule::query()->orderBy("confidence","desc")->get();

        // Untuk menglimit hasil dari report yang  diexport menjadi 10 data pada pdf
        // $dataAssociation = AssociationRule::limit(10)->get();

        // Gabungan jadi begini
        $dataAssociation = AssociationRule::limit(10)->orderBy('confidence', 'desc')->get();
        // UMUM
        // $dataAssociation = AssociationRule::get();
        foreach ($dataAssociation as &$datum) {
            $datum['support'] = round($datum->support * 100, 2) . '%';
            $datum['confidence'] = round($datum->confidence * 100, 2) . '%';
            $datum['consequentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->consequent)));
            $datum['antecedentConcat'] = implode(',', $this->changeCodeProducts(json_decode($datum->antecedent)));
        }
        $pdf = Pdf::loadView('report', [
            'title' => 'Report Order',
            'data' => $dataAssociation,
            // 'image' => base64_encode(Storage::disk('public')->get('logo.png'))
        ]);
        return $pdf->stream();
        // return $pdf->download('salaryHistory' . $monthName . '.pdf');
    }
}
