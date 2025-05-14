<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SertifikatMagang extends Model
{
    protected $table = "sertifikat_magangs";

    protected $fillable = [
        'id_peserta',
        'sertifikat_magang'
    ];

    // Relasi dengan model Peserta
    public function peserta()
    {
        return $this->belongsTo(Peserta::class, 'id_peserta');
    }
}
