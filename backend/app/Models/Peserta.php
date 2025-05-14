<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peserta extends Model
{
    use HasFactory;

    protected $table = 'pesertas';
    protected $fillable = [
        'pendaftar_id',
        'tanggal',
        'tanggal_selesai',
        'mentor',
        'mentor_kedua',
        'email',
        'email_kedua',
        'noHp',
        'noHp_kedua',
        'bidang_peminatan_id',
        'status'
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function sertifikatMagang()
    {
        return $this->hasOne(SertifikatMagang::class, 'id_peserta');
    }

    public function suratPenilaian()
    {
        return $this->hasOne(SuratPenilaian::class, 'id_peserta');
    }

    public function suratBalasan()
    {
        return $this->hasOne(SuratBalasanMagang::class, 'id_peserta');
    }

    public function berkasPeserta()
    {
        return $this->hasOne(BerkasPeserta::class, 'id_peserta');
    }

    // Relasi ke Pendaftar
    public function pendaftar()
    {
        return $this->belongsTo(Pendaftar::class, 'pendaftar_id', 'id_pendaftar');
    }

    // Relasi ke BidangPeminatan
    public function bidangPeminatan()
    {
        return $this->belongsTo(BidangPeminatan::class, 'bidang_peminatan_id');
    }

    // Status options
    public static function statusOptions()
    {
        return [
            'finished' => 'Selesai',
            'onGoing' => 'Berjalan'
        ];
    }
}
