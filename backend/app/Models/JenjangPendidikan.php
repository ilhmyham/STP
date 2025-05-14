<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenjangPendidikan extends Model
{
    use HasFactory;

    protected $table = 'jenjang_pendidikans';

    protected $fillable = [
        'pendidikan',
    ];

    public function pesertas()
    {
        return $this->hasMany(Peserta::class, 'bidang_peminatan_id');
    }
}
