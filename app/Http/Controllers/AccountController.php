<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AccountController extends Controller
{
    public function index()
    {
        $data = User::query()->where('id', '!=', 2)->paginate();
        $header = [
            [
                'label' => 'Account Name',
                'key-data' => 'name'
            ],
            [
                'label' => 'Join',
                'key-data' => 'created_at'
            ],
            [
                'label' => 'Account Email',
                'key-data' => 'email'
            ],
            [
                'action' => 'delete',
                'label' => 'Delete',
                'href' => 'account/delete',
                'key-data' => 'id'
            ],
        ];
        return Inertia::render('Account', [
            'table' => [
                'name' => 'Table Data',
                'header' => $header,
                'data' => $data
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('AccountAdd');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);
        return redirect()->route('account');
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('account');
    }
}
