<?php

namespace App\Http\Controllers;

use App\Models\SuratPenilaian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SuratPenilaianController extends Controller
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
            'surat_penilaian' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        try {
            // Menyimpan dokumen di storage publik
            $surat_penilaian = $request->file('surat_penilaian') ? $request->file('surat_penilaian')->store('berkas_peserta/surat_penilaian', 'public') : null;


            $berkasPeserta = SuratPenilaian::create([
                'id_peserta' => $validated['id_peserta'],
                'surat_penilaian' => $surat_penilaian
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
    public function show(SuratPenilaian $id)
    {
        $suratBalasan = SuratPenilaian::find($id);

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
    public function edit(SuratPenilaian $suratPenilaian)
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
            'surat_penilaian' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        try {
            $berkasPeserta = SuratPenilaian::findOrFail($id);
            $pesanUpdate = [];

            // ----------- Update surat_penilaian -----------
            if ($request->hasFile('surat_penilaian')) {
                $file = $request->file('surat_penilaian');
                $fileName = uniqid() . '-' . $file->getClientOriginalName();

                if ($berkasPeserta->surat_penilaian && Storage::disk('public')->exists($berkasPeserta->surat_penilaian)) {
                    Storage::disk('public')->delete($berkasPeserta->surat_penilaian);
                }

                $path = $file->storeAs('berkas_peserta/surat_penilaian', $fileName, 'public');
                $berkasPeserta->surat_penilaian = $path;
                $pesanUpdate[] = 'surat_penilaian diperbarui';
                // Log::info('surat_penilaian berhasil diperbarui: ' . $path);
            }

            // ----------- Simpan dan Kembalikan Response -----------
            $berkasPeserta->save();

            return response()->json([
                'message' => count($pesanUpdate) > 0
                    ? 'Berhasil memperbarui surat_penilaian: ' . implode(', ', $pesanUpdate)
                    : 'Tidak ada file yang diperbarui, tetapi data disimpan ulang.',
                'data' => $berkasPeserta
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui surat_penilaian.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuratPenilaian $suratPenilaian)
    {
        //
    }
}
