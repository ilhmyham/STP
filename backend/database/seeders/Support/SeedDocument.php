<?php

namespace Database\Seeders\Support;

use Illuminate\Support\Facades\Storage;

/**
 * Pembuat dokumen PDF contoh untuk data seed.
 *
 * Data seed menyimpan path berkas (mis. `seed/berkas-pendaftar/1/cv.pdf`).
 * Tanpa file fisik, tautan "Lihat Dokumen" di admin akan gagal (403/404).
 * Helper ini membuat PDF minimal yang valid agar dokumen seed bisa dibuka.
 *
 * File ditulis ke disk `public` (storage/app/public) sehingga dapat diakses
 * lewat URL `/storage/...` setelah `php artisan storage:link`.
 */
class SeedDocument
{
    /**
     * Pastikan file PDF contoh ada di disk publik.
     */
    public static function pdf(string $path, string $title): void
    {
        Storage::disk('public')->put($path, self::makePdf($title));
    }

    /**
     * Membuat isi PDF satu halaman berisi teks judul.
     */
    private static function makePdf(string $title): string
    {
        $text = self::escape($title);
        $content = "BT /F1 18 Tf 72 770 Td ({$text}) Tj ET\n";

        $objects = [
            '<< /Type /Catalog /Pages 2 0 R >>',
            '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
            '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] '
                .'/Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
            '<< /Length '.strlen($content)." >>\nstream\n{$content}endstream",
            '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
        ];

        $pdf = "%PDF-1.4\n";
        $offsets = [];

        foreach ($objects as $index => $object) {
            $offsets[] = strlen($pdf);
            $pdf .= ($index + 1)." 0 obj\n{$object}\nendobj\n";
        }

        $xrefOffset = strlen($pdf);
        $pdf .= 'xref'."\n".'0 '.(count($objects) + 1)."\n";
        $pdf .= "0000000000 65535 f \n";

        foreach ($offsets as $offset) {
            $pdf .= sprintf("%010d 00000 n \n", $offset);
        }

        $pdf .= 'trailer'."\n".'<< /Size '.(count($objects) + 1)
            ." /Root 1 0 R >>\n";
        $pdf .= "startxref\n{$xrefOffset}\n%%EOF\n";

        return $pdf;
    }

    /**
     * Escape karakter khusus di dalam string PDF.
     */
    private static function escape(string $text): string
    {
        return str_replace(
            ['\\', '(', ')'],
            ['\\\\', '\\(', '\\)'],
            $text
        );
    }
}
