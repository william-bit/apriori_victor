<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DataController;
use App\Http\Controllers\RuleController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AlgorithmController;
use App\Http\Controllers\WhiteListController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\RecommendationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/data', [DataController::class, 'index'])->name('data');
    Route::get('/data/destroy', [DataController::class, 'destroy'])->name('data.destroy');
    Route::get('/data/excel', [DataController::class, 'exportExcel'])->name('data.excel');
    Route::get('/report', [ReportController::class, 'index'])->name('report');
    Route::get('/report/top-five', [ReportController::class, 'export'])->name('report.topFive');
    Route::get('/report/transaction', [ReportController::class, 'transaction'])->name('report.transaction');
    Route::get('/report/product', [ReportController::class, 'product'])->name('report.product');
    Route::get('/report/result', [ReportController::class, 'result'])->name('report.result');
    Route::get('/data/import', [DataController::class, 'import'])->name('data.import');
    Route::get('/product/import', [ProductController::class, 'import'])->name('product.import');
    Route::get('/recommendation', [RecommendationController::class, 'index'])->name('recommendation');
    Route::get('/product', [ProductController::class, 'index'])->name('product');
    Route::get('/product/delete', [ProductController::class, 'destroy'])->name('product.destroy');
    Route::post('/product', [ProductController::class, 'store'])->name('product');
    Route::get('/rule/config', [ConfigController::class, 'index'])->name('config');
    Route::post('/rule', [RuleController::class, 'index'])->name('apriori');
    Route::get('/whitelist', [WhiteListController::class, 'index'])->name('whitelist');
    Route::post('/whitelist', [WhiteListController::class, 'store'])->name('whitelist');
    Route::get('/rule/get-status', [RuleController::class, 'getStatus'])->name('apriori.getStatus');
    Route::get('/transaction/get-data', [TransactionController::class, 'getData'])->name('transaction.data');
    Route::get('/product/get-data', [ProductController::class, 'getData'])->name('product.data');
    Route::get('/algorithm/get-data', [AlgorithmController::class, 'getData'])->name('algorithm.data');
    Route::post('/transaction', [TransactionController::class, 'index'])->name('transaction');
    Route::get('/algorithm/start', [AlgorithmController::class, 'index'])->name('algorithm.start');
    Route::get('/recommendation/report', [RecommendationController::class, 'export'])->name('algorithm.export');
    Route::get('/account', [AccountController::class, 'index'])->name('account');
    Route::get('/account/add', [AccountController::class, 'create'])->name('account.add');
    Route::get('/account/delete/{id}', [AccountController::class, 'destroy'])->name('account.delete');
    Route::post('/account', [AccountController::class, 'store'])->name('account');
});

require __DIR__ . '/auth.php';
