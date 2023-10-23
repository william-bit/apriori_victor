<?php

namespace App\Http\Controllers;

use App\Models\AssociationRule;
use App\Models\Product;
use App\Models\Rule;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Phpml\Association\Apriori;

class AlgorithmController extends Controller
{
    public function getData()
    {
        return AssociationRule::get();
    }
    public function transform($data)
    {
        $newData = [];
        $dataProducts = [];
        foreach ($data as $datum) {
            $dataProducts[$datum->product_code] = $datum->product_name;
            $newData[$datum->no_invoice][] = $datum->product_code;
        }
        return [
            'sample' => array_values($newData),
            'dataProducts' => $dataProducts
        ];
    }
    public function index()
    {
        $rule = Rule::find(1);
        $transaction = Transaction::select('product_code', 'no_invoice', 'product_name')->get();
        if ($rule && $transaction) {
            ['sample' => $samples, 'dataProducts' => $dataProducts] = $this->transform($transaction);
            AssociationRule::truncate();
            $labels  = [];

            $associator = new Apriori($rule->support, $rule->confidence);
            $associator->train($samples, $labels);
            $data = $associator->getRules();
            foreach ($data as $datum) {
                AssociationRule::create([
                    'consequent' => json_encode($datum['consequent']),
                    'antecedent' => json_encode($datum['antecedent']),
                    'consequentSet' => count($datum['consequent']),
                    'antecedentSet' => count($datum['antecedent']),
                    'confidence' => $datum['confidence'],
                    'support' => $datum['support'],
                ]);
            }
            $this->automaticInsertProduct($dataProducts);
            return redirect()->route('recommendation');
        }
    }
    public function getProduct()
    {
        return Product::get()->toArray();
    }
    private function automaticInsertProduct($dataProducts)
    {
        $data = $this->getProduct();
        foreach ($dataProducts as $productCode => $productName) {
            if (!in_array($productCode, array_column($data, 'product_code'))) {
                Product::create([
                    'product_name' => $productName,
                    'product_code' => $productCode,
                    'price' => 0,
                    'unit' => 0,
                ]);
            }
        }
    }
}
