<?php

namespace App\Http\Controllers;

use App\Models\Pendaftar;
use Illuminate\Http\Request;
use App\Models\BerkasPendaftar;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class PendaftarController extends Controller
{
    public function index()
    {
         $pendaftars = Pendaftar::with(['berkas', 'bidangPeminatan', 'jenjangPendidikan', 'peserta'])->get();

    return response()->json([
        'success' => true,
        'data' => $pendaftars
    ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // Validasi lainnya tetap sama ...
            'nama' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:pria,wanita',
            'email' => 'required|email|unique:pendaftars,email',
            'noHP' => 'required|string',
            'alamat_asal' => 'required|string',
            'alamat_domisili' => 'required|string',
            'asal_instansi' => 'required|string',
            'jenjang_pendidikan' => 'required|integer|exists:jenjang_pendidikans,id',
            'fakultas' => 'nullable|string',
            'program_studi' => 'required|string',
            'nim' => 'required|string',
            'semester' => 'required|string',
            'durasi' => 'required|string',
            'periodic_mulai' => 'required|date',
            'bidang_peminatan' => 'required|integer|exists:bidang_peminatans,id',
            'cv' => 'required|file|mimes:pdf|max:2048',
            'surat_rekomendasi' => 'required|file|mimes:pdf|max:2048',
            'proposal' => 'required|file|mimes:pdf|max:2048',
            'dok_pendukung' => 'nullable|file|mimes:pdf|max:2048',
            'status' => 'sometimes|in:uncheck,diterima,ditolak',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Cek apakah user sudah pernah daftar
        if (Pendaftar::where('user_id', $request->user_id)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Kamu sudah pernah mengisi formulir pendaftaran.',
            ], 400);
        }

        // Ambil semua data kecuali file
        $pendaftarData = $request->except(['cv', 'surat_rekomendasi', 'proposal', 'dok_pendukung']);

        // Isi user_id dari user login, wajib ada
        $pendaftarData['user_id'] = $request->input('user_id');

        if (!$pendaftarData['user_id']) {
            return response()->json([
                'success' => false,
                'message' => 'User ID harus disertakan di request untuk testing tanpa login',
            ], 422);
        }

        // Simpan data pendaftar
        $pendaftar = Pendaftar::create($pendaftarData);

        // Upload file ke storage
        $cvPath = $request->file('cv')->store('berkas', 'public');
        $rekomendasiPath = $request->file('surat_rekomendasi')->store('berkas', 'public');
        $proposalPath = $request->file('proposal')->store('berkas', 'public');
        $dokPendukungPath = $request->hasFile('dok_pendukung')
            ? $request->file('dok_pendukung')->store('berkas', 'public')
            : null;

        // Simpan path file ke tabel berkas_pendaftars
        $berkas = new BerkasPendaftar([
            'cv' => $cvPath,
            'surat_rekomendasi' => $rekomendasiPath,
            'proposal' => $proposalPath,
            'dok_pendukung' => $dokPendukungPath,
        ]);
        $berkas->id_pendaftar = $pendaftar->id_pendaftar;
        $berkas->save();

        return response()->json([
            'success' => true,
            'data' => $pendaftar,
            'berkas' => $berkas,
        ], 201);
    }


    public function show($id)
    {
        $pendaftar = Pendaftar::with('berkas', 'jenjangPendidikan', 'bidangPeminatan')->find($id);

        if (!$pendaftar) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pendaftar
        ]);
    }

    public function update(Request $request, $id)
    {
        $pendaftar = Pendaftar::find($id);

        if (!$pendaftar) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama' => 'sometimes|string',
            'tempat_lahir' => 'sometimes|string',
            'tanggal_lahir' => 'sometimes|date',
            'jenis_kelamin' => 'sometimes|in:pria,wanita',
            'email' => 'sometimes|email|unique:pendaftars,email,' . $id . ',id_pendaftar',
            'noHP' => 'sometimes|string',
            'alamat_asal' => 'sometimes|string',
            'alamat_domisili' => 'sometimes|string',
            'asal_instansi' => 'sometimes|string',
            'jenjang_pendidikan' => 'sometimes|integer',
            'fakultas' => 'nullable|string',
            'program_studi' => 'sometimes|string',
            'nim' => 'sometimes|string',
            'semester' => 'sometimes|string',
            'durasi' => 'sometimes|string',
            'periodic_mulai' => 'sometimes|date',
            'bidang_peminatan' => 'sometimes|integer',
            'cv' => 'required|string',
            'surat_rekomendasi' => 'required|string',
            'proposal' => 'required|string',
            'dok_pendukung' => 'nullable|string',
            'status' => 'sometimes|in:uncheck,diterima,ditolak'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        $pendaftar->update($validatedData);

        $pendaftar->refresh();

        return response()->json([
            'success' => true,
            'data' => $pendaftar
        ]);
    }

    public function destroy($id)
    {
        $pendaftar = Pendaftar::find($id);

        if (!$pendaftar) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
            ], 404);
        }

        $pendaftar->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pendaftar berhasil dihapus'
        ]);
    }

    public function updateStatus(Request $request, $id)
{
    $pendaftar = Pendaftar::find($id);

    if (!$pendaftar) {
        return response()->json([
            'success' => false,
            'message' => 'Pendaftar tidak ditemukan'
        ], 404);
    }

    $validator = Validator::make($request->all(), [
        'status' => 'required|in:uncheck,diterima,ditolak'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // Update status
    $pendaftar->update(['status' => $request->status]);

    return response()->json([
        'success' => true,
        'data' => $pendaftar,
        'message' => 'Status berhasil diupdate'
    ]);
}
}
