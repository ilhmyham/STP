<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pendaftars', function (Blueprint $table) {
            $table->id('id_pendaftar');
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade'); // relasi 1:1
            $table->string('nama');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['pria', 'wanita']);
            $table->string('email')->unique();
            $table->string('noHP');
            $table->string('alamat_asal');
            $table->string('alamat_domisili');
            $table->string('asal_instansi');
            $table->unsignedBigInteger('jenjang_pendidikan');
            $table->string('fakultas')->nullable();
            $table->string('program_studi');
            $table->string('nim');
            $table->string('semester');
            $table->string('durasi');
            $table->date('periodic_mulai');
            $table->unsignedBigInteger('bidang_peminatan');
            $table->enum('status', ['uncheck', 'diterima', 'ditolak'])->default('uncheck');
            $table->timestamps();

            // Foreign key constraints lainnya
            $table->foreign('jenjang_pendidikan')->references('id')->on('jenjang_pendidikans');
            $table->foreign('bidang_peminatan')->references('id')->on('bidang_peminatans');
        });


    }

    public function down()
    {
        Schema::dropIfExists('pendaftars');
    }
};
