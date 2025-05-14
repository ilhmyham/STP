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
        Schema::create('sertifikat_magangs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_peserta')->unsigned(); // pastikan nama kolom yang tepat
            $table->string('sertifikat_magang', 255)->nullable(); // Menjadikan kolom ini nullable
            $table->timestamps();

            $table->foreign('id_peserta')->references('id')->on('pesertas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sertifikat_magangs');
    }
};
