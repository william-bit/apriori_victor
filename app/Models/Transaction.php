<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_at',
        'no_invoice',
        'date_invoice',
        'product_code',
        'product_name',
    ];
    public function getCreatedAtAttribute($value)
    {
        return Carbon::createFromTimestamp(strtotime($value))
            ->timezone('Asia/Jakarta')
            ->toDateTimeString();
    }
    public function getUpdatedAtAttribute($value)
    {
        return $this->getCreatedAtAttribute($value);
    }
}
