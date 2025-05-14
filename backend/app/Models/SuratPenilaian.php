<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratPenilaian extends Model
{
    protected $table = 'surat_penilaians';

     // Kolom yang dapat diisi (fillable)
     protected $fillable = [
         'id_peserta',
         'surat_penilaian'
     ];

     // Relasi dengan model Peserta
     public function peserta()
     {
         return $this->belongsTo(Peserta::class, 'id_peserta');
     }
}
