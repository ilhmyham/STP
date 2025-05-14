<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuratBalasanMagang extends Model
{
     // Menentukan nama tabel jika berbeda dengan nama model (opsional)
     protected $table = 'surat_balasan_magangs';

     // Kolom yang dapat diisi (fillable)
     protected $fillable = [
         'id_peserta',
         'surat_balasan'
     ];

     // Relasi dengan model Peserta
     public function peserta()
     {
         return $this->belongsTo(Peserta::class, 'id_peserta');
     }
}
