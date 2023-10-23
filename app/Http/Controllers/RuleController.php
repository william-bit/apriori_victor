<?php

namespace App\Http\Controllers;

use App\Models\Rule;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RuleController extends Controller
{
    public function index(Request $request)
    {
        if ($request->confidence < 0.1 || $request->support < 0.1) {
            throw ValidationException::withMessages(['message' => 'confidence or support less than 0.1']);
        }
        Rule::updateOrCreate(
            ['id' => '1'],
            ['confidence' => $request->confidence, 'support' => $request->support]
        );
        return redirect()->route('config');
    }
    public function getStatus()
    {
        return Rule::find(1);
    }
}