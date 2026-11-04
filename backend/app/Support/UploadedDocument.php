<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

/**
 * Penyimpanan dokumen unggahan di disk `public`.
 *
 * `UploadedFile::store()` menamai file berdasarkan hasil deteksi MIME.
 * Untuk DOCX, finfo mendeteksi `application/zip` sehingga ekstensi asli
 * hilang (tersimpan sebagai `.zip`). Helper ini mempertahankan ekstensi
 * dari nama file asli agar dokumen tetap terbuka dengan aplikasi yang benar.
 */
class UploadedDocument
{
    /**
     * Simpan file ke folder tertentu dan kembalikan path relatifnya.
     */
    public static function store(
        ?UploadedFile $file,
        string $folder
    ): ?string {
        if (! $file) {
            return null;
        }

        $originalName = pathinfo(
            $file->getClientOriginalName(),
            PATHINFO_FILENAME
        );
        $extension = strtolower(
            $file->getClientOriginalExtension()
        );

        $baseName = Str::slug($originalName) ?: 'dokumen';
        $fileName = $baseName.'-'.Str::random(8);

        if ($extension !== '') {
            $fileName .= '.'.$extension;
        }

        return $file->storeAs($folder, $fileName, 'public');
    }
}
