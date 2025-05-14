<?php

namespace App\Http\Controllers;

use App\Models\JenjangPendidikan;
use Illuminate\Http\Request;

class JenjangPendidikanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = JenjangPendidikan::all();
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'pendidikan' => 'required|string|max:80',
        ]);

        $jenjang = JenjangPendidikan::create([
            'pendidikan' => $request->pendidikan,
        ]);

        return response()->json([
            'message' => 'Jenjang pendidikan berhasil ditambahkan.',
            'data' => $jenjang,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(JenjangPendidikan $jenjangPendidikan)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenjangPendidikan $jenjangPendidikan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenjangPendidikan $jenjangPendidikan)
    {
        //
    }
}
