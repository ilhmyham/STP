<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftar extends Model
{
    use HasFactory;

    protected $table = 'pendaftars';
    protected $primaryKey = 'id_pendaftar';

    protected $fillable = [
    'user_id',
    'nama',
    'tempat_lahir',
    'tanggal_lahir',
    'jenis_kelamin',
    'email',
    'noHP',
    'alamat_asal',
    'alamat_domisili',
    'asal_instansi',
    'jenjang_pendidikan',
    'fakultas',
    'program_studi',
    'nim',
    'semester',
    'durasi',
    'periodic_mulai',
    'bidang_peminatan',
    'id_berkas_pendaftar',
    'status',
];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'periodic_mulai' => 'date',
    ];

    public static function jenisKelaminOptions()
    {
        return [
            'pria' => 'Pria',
            'wanita' => 'Wanita',
        ];
    }

    public static function statusOptions()
    {
        return [
            'uncheck' => 'Belum Dicek',
            'diterima' => 'Diterima',
            'ditolak' => 'Ditolak',
        ];
    }

    public function peserta()
    {
        return $this->hasOne(Peserta::class, 'pendaftar_id', 'id_pendaftar');
    }

    public function bidangPeminatan()
    {
        return $this->belongsTo(BidangPeminatan::class, 'bidang_peminatan');
    }

    public function jenjangPendidikan()
    {
        return $this->belongsTo(JenjangPendidikan::class, 'jenjang_pendidikan');
    }

    public function berkas()
    {
        return $this->hasOne(BerkasPendaftar::class, 'id_pendaftar', 'id_pendaftar');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
