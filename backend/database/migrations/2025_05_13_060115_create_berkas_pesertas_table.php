<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('berkas_pesertas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_peserta')->unsigned(); // pastikan nama kolom yang tepat
            $table->string('surat_balasan', 255)->nullable(); // Menjadikan kolom ini nullable
            $table->string('surat_penilaian', 255)->nullable(); // Menjadikan kolom ini nullable
            $table->string('sertifikat_magang', 255)->nullable();
            $table->timestamps();

            // Menambahkan foreign key yang benar
            $table->foreign('id_peserta')->references('id')->on('pesertas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas_pesertas');
    }
};
