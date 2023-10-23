<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class WhiteListController extends Controller
{
    public function index()
    {
        $users = User::get();
        return view('pages.whitelist', [
            "users" => $users
        ]);
    }

    public function store(Request $request)
    {
        $user = User::find($request->user);
        $user->role = $request->role;
        $user->save();
        return redirect()->route('whitelist');
    }
}
