<?php

namespace App\Http\Controllers;

use App\Models\BidangPeminatan;
use Illuminate\Http\Request;

class BidangPeminatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // Menampilkan semua data bidang peminatan
    public function index()
    {
        $data = BidangPeminatan::all();
        return response()->json($data);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_bidang' => 'required|string|max:80',
        ]);

        $bidang = BidangPeminatan::create([
            'nama_bidang' => $request->nama_bidang,
        ]);

        return response()->json($bidang, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BidangPeminatan $bidangPeminatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BidangPeminatan $bidangPeminatan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BidangPeminatan $bidangPeminatan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BidangPeminatan $bidangPeminatan)
    {
        //
    }
}
