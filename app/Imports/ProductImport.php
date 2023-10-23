<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ProductImport implements ToModel, WithStartRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function startRow(): int
    {
        return 2;
    }
    public function model(array $row)
    {
        if ($row[0] && $row[1]) {
            return new Product([
                'product_name' => $row[0],
                'product_code' => $row[1],
                'price' => 0,
                'unit' => 'pcs'
            ]);

        }
    }
}
