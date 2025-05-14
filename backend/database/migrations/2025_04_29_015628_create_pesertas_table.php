<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pesertas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pendaftar_id');
            $table->date('tanggal');
            $table->date('tanggal_selesai');
            $table->string('mentor');
            $table->string('mentor_kedua')->nullable();
            $table->string('email');
            $table->string('email_kedua')->nullable();
            $table->string('noHp');
            $table->string('noHp_kedua')->nullable();
            $table->unsignedBigInteger('bidang_peminatan_id')->nullable();
            $table->enum('status', ['finished', 'onGoing'])->default('onGoing');
            $table->timestamps();

            // Foreign key ke pendaftar
            $table->foreign('pendaftar_id')
                ->references('id_pendaftar')
                ->on('pendaftars')
                ->onDelete('cascade');

            // Foreign key ke bidang_peminatans
            $table->foreign('bidang_peminatan_id')
                ->references('id')
                ->on('bidang_peminatans')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('pesertas', function (Blueprint $table) {
            $table->dropForeign(['pendaftar_id']);
            $table->dropForeign(['bidang_peminatan_id']);
        });

        Schema::dropIfExists('pesertas');
    }
};
