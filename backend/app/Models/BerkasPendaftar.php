<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BerkasPendaftar extends Model
{
    use HasFactory;

    protected $table = 'berkas_pendaftars';

    protected $fillable = [
        'cv',
        'surat_rekomendasi',
        'proposal',
        'dok_pendukung',
        'id_pendaftar',
    ];

    // Relasi ke model Pendaftar (One-to-One)
    public function pendaftar()
{
    return $this->belongsTo(Pendaftar::class, 'id_pendaftar');
}
}
