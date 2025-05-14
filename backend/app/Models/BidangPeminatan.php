<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BidangPeminatan extends Model
{
    use HasFactory;

    protected $table = 'bidang_peminatans'; // Nama tabel di database


    protected $fillable = [
        'nama_bidang',
    ];

    public function pesertas()
    {
        return $this->hasMany(Peserta::class, 'bidang_peminatan_id');
    }
}
