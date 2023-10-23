<?php
namespace App\Http\Controllers;

use App\Models\Rule;
use Inertia\Inertia;

class ConfigController extends Controller
{
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
        return Inertia::render('Config', [
            'confidence' => $confidence,
            'support' => $support,
        ]);
    }
}
