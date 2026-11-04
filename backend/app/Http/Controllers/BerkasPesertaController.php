<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BerkasPeserta;
use App\Support\UploadedDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Tambahkan Log untuk debugging

class BerkasPesertaController extends Controller
{
    // Menambah data BerkasPeserta baru
    public function store(Request $request)
    {
        // Validasi data yang diterima
        $validated = $request->validate([
            'id_peserta' => 'required|exists:pesertas,id',
            'surat_balasan' => 'nullable|file|extensions:pdf,doc,docx,jpg,jpeg,png|max:10240',
            'surat_penilaian' => 'nullable|file|extensions:pdf,doc,docx,jpg,jpeg,png|max:10240',
            'sertifikat_magang' => 'nullable|file|extensions:pdf,doc,docx,jpg,jpeg,png|max:10240',
        ]);

        try {
            // Menyimpan dokumen di storage publik
            $surat_balasan = UploadedDocument::store($request->file('surat_balasan'), 'berkas_peserta/surat_balasan');
            $surat_penilaian = UploadedDocument::store($request->file('surat_penilaian'), 'berkas_peserta/surat_penilaian');
            $sertifikat_magang = UploadedDocument::store($request->file('sertifikat_magang'), 'berkas_peserta/sertifikat_magang');

            // Debugging: Log file paths
            Log::info('File surat_balasan: ' . $surat_balasan);
            Log::info('File surat_penilaian: ' . $surat_penilaian);
            Log::info('File sertifikat_magang: ' . $sertifikat_magang);

            // Membuat atau memperbarui data (relasi Peserta memakai hasOne,
            // jadi satu peserta hanya boleh punya satu baris berkas).
            $berkasPeserta = BerkasPeserta::firstOrNew([
                'id_peserta' => $validated['id_peserta'],
            ]);

            if ($surat_balasan) {
                $berkasPeserta->surat_balasan = $surat_balasan;
            }
            if ($surat_penilaian) {
                $berkasPeserta->surat_penilaian = $surat_penilaian;
            }
            if ($sertifikat_magang) {
                $berkasPeserta->sertifikat_magang = $sertifikat_magang;
            }

            $berkasPeserta->save();

            return response()->json([
                'message' => 'Berkas Peserta berhasil disimpan.',
                'data' => $berkasPeserta
            ], 201);
        } catch (\Exception $e) {
            Log::error('Gagal menambahkan berkas peserta: ' . $e->getMessage()); // Logging error
            return response()->json([
                'message' => 'Gagal menambahkan berkas peserta.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Melihat data BerkasPeserta berdasarkan ID
    public function show($id)
    {
        // Mencari data berdasarkan ID
        $berkasPeserta = BerkasPeserta::find($id);

        // Jika data tidak ditemukan
        if (!$berkasPeserta) {
            return response()->json([
                'message' => 'Berkas Peserta tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'data' => $berkasPeserta
        ], 200);
    }

    // Mengupdate data BerkasPeserta berdasarkan ID
    public function update(Request $request, $id)
{
    Log::info('CHECK FILE UPLOAD:');
Log::info('hasFile(surat_balasan): ' . ($request->hasFile('surat_balasan') ? 'YA' : 'TIDAK'));
Log::info('hasFile(surat_penilaian): ' . ($request->hasFile('surat_penilaian') ? 'YA' : 'TIDAK'));
Log::info('hasFile(sertifikat_magang): ' . ($request->hasFile('sertifikat_magang') ? 'YA' : 'TIDAK'));

if ($request->hasFile('sertifikat_magang')) {
    Log::info('INFO FILE sertifikat_magang:', [
        'original_name' => $request->file('sertifikat_magang')->getClientOriginalName(),
        'mime' => $request->file('sertifikat_magang')->getMimeType(),
        'size' => $request->file('sertifikat_magang')->getSize(),
    ]);
}
    // Validasi file upload
    $validated = $request->validate([
        'surat_balasan' => 'nullable|file|extensions:pdf,doc,docx,jpg,jpeg,png|max:10240',
        'surat_penilaian' => 'nullable|file|extensions:pdf,doc,docx,jpg,jpeg,png|max:10240',
        'sertifikat_magang' => 'nullable|file|extensions:pdf,doc,docx,jpg,jpeg,png|max:10240',
    ]);

    try {
        $berkasPeserta = BerkasPeserta::findOrFail($id);
        $pesanUpdate = [];

        // ----------- Update surat_balasan -----------
        if ($request->hasFile('surat_balasan')) {
            $file = $request->file('surat_balasan');

            if ($berkasPeserta->surat_balasan && Storage::disk('public')->exists($berkasPeserta->surat_balasan)) {
                Storage::disk('public')->delete($berkasPeserta->surat_balasan);
            }

            $path = UploadedDocument::store($file, 'berkas_peserta/surat_balasan');
            $berkasPeserta->surat_balasan = $path;
            $pesanUpdate[] = 'surat_balasan diperbarui';
            // Log::info('surat_balasan berhasil diperbarui: ' . $path);
        }

        // ----------- Update surat_penilaian -----------
        if ($request->hasFile('surat_penilaian')) {
            $file = $request->file('surat_penilaian');

            if ($berkasPeserta->surat_penilaian && Storage::disk('public')->exists($berkasPeserta->surat_penilaian)) {
                Storage::disk('public')->delete($berkasPeserta->surat_penilaian);
            }

            $path = UploadedDocument::store($file, 'berkas_peserta/surat_penilaian');
            $berkasPeserta->surat_penilaian = $path;
            $pesanUpdate[] = 'surat_penilaian diperbarui';
            // Log::info('surat_penilaian berhasil diperbarui: ' . $path);
        }

        // ----------- Update sertifikat_magang -----------
        if ($request->hasFile('sertifikat_magang')) {
            $file = $request->file('sertifikat_magang');

            if ($berkasPeserta->sertifikat_magang && Storage::disk('public')->exists($berkasPeserta->sertifikat_magang)) {
                Storage::disk('public')->delete($berkasPeserta->sertifikat_magang);
            }

            $path = UploadedDocument::store($file, 'berkas_peserta/sertifikat_magang');
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
        Log::error('Gagal memperbarui berkas peserta: ' . $e->getMessage());
        return response()->json([
            'message' => 'Gagal memperbarui berkas peserta.',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
