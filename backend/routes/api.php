<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Container\Attributes\Auth;
use App\Http\Controllers\PesertaController;
use App\Http\Controllers\PendaftarController;
use App\Http\Controllers\BerkasPendaftarController;
use App\Http\Controllers\SuratBalasanMagangController;
use App\Http\Controllers\BidangPeminatanController;
use App\Http\Controllers\JenjangPendidikanController;
use App\Http\Controllers\BerkasPesertaController;
use App\Http\Controllers\SertifikatMagangController;
use App\Http\Controllers\SuratPenilaianController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::apiresource('users', UserController::class);
Route::apiresource('jenjangPendidikans', JenjangPendidikanController::class);
Route::apiResource('bidangPeminatans', BidangPeminatanController::class);
Route::apiResource('berkasPendaftars', BerkasPendaftarController::class);
Route::apiResource('pendaftars', PendaftarController::class);
Route::put('pendaftars/{id}/update-status', [PendaftarController::class, 'updateStatus']);
Route::apiResource('pesertas', PesertaController::class);


Route::post('berkas-peserta', [BerkasPesertaController::class, 'store']);
Route::get('berkas-peserta/{id}', [BerkasPesertaController::class, 'show']);
Route::put('berkas-peserta/{id}', [BerkasPesertaController::class, 'update']);


Route::post('surat-balasan', [SuratBalasanMagangController::class, 'store']);
Route::get('surat-balasan/{id}', [SuratBalasanMagangController::class, 'show']);
Route::put('surat-balasan/{id}', [SuratBalasanMagangController::class, 'update']);

Route::post('surat-penilaian', [SuratPenilaianController::class, 'store']);
Route::get('surat-penilaian/{id}', [SuratPenilaianController::class, 'show']);
Route::put('surat-penilaian/{id}', [SuratPenilaianController::class, 'update']);

Route::post('sertifikat', [SertifikatMagangController::class, 'store']);
Route::get('sertifikat/{id}', [SertifikatMagangController::class, 'show']);
Route::put('sertifikat/{id}', [SertifikatMagangController::class, 'update']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin-only', function () {
        return response()->json(['message' => 'Selamat Datang Admin!']);
    });
});

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/user-only', function () {
        return response()->json(['message' => 'Halo User Biasa!']);
    });
});


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
