<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Peserta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PesertaController extends Controller
{
    public function index()
    {
        $pesertas = Peserta::with(['pendaftar.berkas', 'bidangPeminatan', 'suratBalasan', 'suratPenilaian', 'sertifikatMagang'])->get();

        return response()->json([
            'success' => true,
            'data' => $pesertas
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pendaftar_id' => 'required|integer|exists:pendaftars,id_pendaftar',
            'tanggal' => 'required|date|date_format:Y-m-d',
            'tanggal_selesai' => 'required|date|date_format:Y-m-d',
            'mentor' => 'required|string|max:100',
            'mentor_dua' => 'nullable|string|max:100',
            'noHp' => 'required|string|max:20',
            'noHp_dua' => 'nullable|string|max:20',
            'email' => 'required|email|max:100',
            'email_dua' => 'nullable|email|max:100',
            'bidang_peminatan_id' => 'required|integer|exists:bidang_peminatans,id',
            'status' => 'sometimes|in:finished,onGoing'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $peserta = Peserta::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $peserta->load(['pendaftar', 'bidangPeminatan'])
        ], 201);
    }

    public function show($id)
    {
        $peserta = Peserta::with(['pendaftar.berkas', 'bidangPeminatan', 'suratBalasan', 'suratPenilaian', 'sertifikatMagang'])->find($id);

        if (!$peserta) {
            return response()->json([
                'success' => false,
                'message' => 'Peserta tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $peserta
        ]);
    }

    public function update(Request $request, $id)
{
    $peserta = Peserta::with(['pendaftar', 'bidangPeminatan'])->find($id);

    if (!$peserta) {
        return response()->json([
            'success' => false,
            'message' => 'Peserta tidak ditemukan'
        ], 404);
    }

    // Validasi input
    $validator = Validator::make($request->all(), [
        'tanggal' => 'sometimes|date',
        'tanggal_selesai' => 'sometimes|date',
        'mentor' => 'sometimes|string',
        'mentor_kedua' => 'sometimes|string',
        'email' => 'sometimes|email|unique:pendaftars',
        'email_kedua' => 'sometimes|email',
        'noHp' => 'sometimes|string',
        'noHp_kedua' => 'sometimes|string',
        'bidang_peminatan_id' => 'nullable|exists:bidang_peminatans,id',
        'status' => 'sometimes|in:finished,ongoing'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // Validasi data yang telah diterima
    $validatedData = $validator->validated();

    // Periksa apakah tanggal selesai sudah terisi
    if (isset($validatedData['tanggal_selesai'])) {
        // Cek apakah tanggal selesai sudah lewat atau belum
        $status = (strtotime($validatedData['tanggal_selesai']) <= time()) ? 'finished' : 'onGoing';
        $validatedData['status'] = $status;  // Update status berdasarkan tanggal selesai
    }

    // Update data peserta
    $peserta->update($validatedData);

    // Pastikan data terbaru
    $peserta->refresh();

    return response()->json([
        'success' => true,
        'data' => $peserta,
        'message' => 'Data berhasil diupdate'
    ]);
}


    public function destroy($id)
    {
        $peserta = Peserta::find($id);

        if (!$peserta) {
            return response()->json([
                'success' => false,
                'message' => 'Peserta tidak ditemukan'
            ], 404);
        }

        $peserta->delete();

        return response()->json([
            'success' => true,
            'message' => 'Peserta berhasil dihapus'
        ]);
    }
}
