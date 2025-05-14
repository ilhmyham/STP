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
        Schema::create('berkas_pendaftars', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_pendaftar')->unsigned();
            $table->string('cv', 255);
            $table->string('surat_rekomendasi', 255);
            $table->string('proposal', 255);
            $table->string('dok_pendukung', 255)->nullable();
            $table->timestamps();

            $table->foreign('id_pendaftar')->references('id_pendaftar')->on('pendaftars')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas_pendaftars');
    }
};
