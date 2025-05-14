<?php

namespace App\Http\Controllers;

use App\Models\SertifikatMagang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SertifikatMagangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_peserta' => 'required|exists:pesertas,id',
            'sertifikat_magang' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        try {
            // Menyimpan dokumen di storage publik
            $surat_balasan = $request->file('sertifikat_magang') ? $request->file('sertifikat_magang')->store('berkas_peserta/sertifikat_magang', 'public') : null;


            $berkasPeserta = SertifikatMagang::create([
                'id_peserta' => $validated['id_peserta'],
                'sertifikat_magang' => $surat_balasan
            ]);

            return response()->json([
                'message' => 'Berkas Peserta berhasil ditambahkan.',
                'data' => $berkasPeserta
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan berkas peserta.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(SertifikatMagang $id)
    {
        $suratBalasan = SertifikatMagang::find($id);

        // Jika data tidak ditemukan
        if (!$suratBalasan) {
            return response()->json([
                'message' => 'Berkas Peserta tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'data' => $suratBalasan
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SertifikatMagang $sertifikatMagang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    // Validasi file upload
    $validated = $request->validate([
        'surat_balasan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
    ]);

    try {
        $berkasPeserta = SertifikatMagang::findOrFail($id);
        $pesanUpdate = [];

        // ----------- Update sertifikat_magang -----------
        if ($request->hasFile('sertifikat_magang')) {
            $file = $request->file('sertifikat_magang');
            $fileName = uniqid() . '-' . $file->getClientOriginalName();

            if ($berkasPeserta->sertifikat_magang && Storage::disk('public')->exists($berkasPeserta->sertifikat_magang)) {
                Storage::disk('public')->delete($berkasPeserta->sertifikat_magang);
            }

            $path = $file->storeAs('berkas_peserta/sertifikat_magang', $fileName, 'public');
            $berkasPeserta->sertifikat_magang = $path;
            $pesanUpdate[] = 'sertifikat_magang diperbarui';
            // Log::info('sertifikat_magang berhasil diperbarui: ' . $path);
        }

        // ----------- Simpan dan Kembalikan Response -----------
        $berkasPeserta->save();

        return response()->json([
            'message' => count($pesanUpdate) > 0
                ? 'Berhasil memperbarui berkas: ' . implode(', ', $pesanUpdate)
                : 'Tidak ada file yang diperbarui, tetapi data disimpan ulang.',
            'data' => $berkasPeserta
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Gagal memperbarui berkas peserta.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SertifikatMagang $sertifikatMagang)
    {
        //
    }
}
