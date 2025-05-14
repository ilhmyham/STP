<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BerkasPeserta extends Model
{
    use HasFactory;

    // Menentukan nama tabel jika berbeda dengan nama model (opsional)
    protected $table = 'berkas_pesertas';

    // Kolom yang dapat diisi (fillable)
    protected $fillable = [
        'id_peserta',
        'surat_balasan',
        'surat_penilaian',
        'sertifikat_magang',
    ];

    // Relasi dengan model Peserta
    public function peserta()
    {
        return $this->belongsTo(Peserta::class, 'id_peserta');
    }
}
