//MASIH GPT GES, NTAR DIPERBAIKI

import { NextResponse } from "next/server"

// This is a mock API route that would normally fetch data from a database
export async function GET(request: Request) {
  // Route ini statis (bukan /[id]), jadi id dibaca dari query string.
  // Tanpa query, hasilnya tetap status "diproses" seperti sebelumnya.
  const id = new URL(request.url).searchParams.get("id") ?? undefined

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock data - in a real app, this would come from a database
  const applications: Record<
    string,
    { id: string; status: string }
  > = {
    "1": { id: "1", status: "diterima" },
    "2": { id: "2", status: "ditolak" },
    "3": { id: "3", status: "diproses" },
  }

  const application = (id ? applications[id] : undefined) || {
    id,
    status: "diproses",
  }

  return NextResponse.json(application)
}

export async function PATCH(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? undefined
  const data = await request.json()

  // In a real app, you would update the database here

  return NextResponse.json({ id, status: data.status })
}
