// Mock API route. Bentuk respons sengaja disamakan dengan yang kelak
// dikembalikan endpoint user-scoped Laravel (lihat docs/todo-backend.md).

import { NextResponse } from "next/server"

// TODO: ganti ke endpoint user-scoped Laravel.

interface TimelinePayload {
  status: "uncheck" | "diterima" | "ditolak"
  tanggal: string | null
  tanggal_selesai: string | null
}

// Mock data - in a real app, this would come from a database
const timelines: Record<string, TimelinePayload> = {
  "1": {
    status: "diterima",
    tanggal: "2026-01-05",
    tanggal_selesai: "2026-04-05",
  },
  "2": {
    status: "ditolak",
    tanggal: null,
    tanggal_selesai: null,
  },
  "3": {
    status: "uncheck",
    tanggal: null,
    tanggal_selesai: null,
  },
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const timeline = timelines[id] || {
    status: "uncheck",
    tanggal: null,
    tanggal_selesai: null,
  }

  return NextResponse.json({
    success: true,
    data: timeline,
  })
}
