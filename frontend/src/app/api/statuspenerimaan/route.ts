//MASIH GPT GES, NTAR DIPERBAIKI

import { NextResponse } from "next/server"

// This is a mock API route that would normally fetch data from a database
export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate database lookup
  const id = params.id

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock data - in a real app, this would come from a database
  const applications = {
    "1": { id: "1", status: "diterima" },
    "2": { id: "2", status: "ditolak" },
    "3": { id: "3", status: "diproses" },
  }

  // @ts-ignore - This is just for demo purposes
  const application = applications[id] || { id, status: "diproses" }

  return NextResponse.json(application)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const data = await request.json()

  // In a real app, you would update the database here

  return NextResponse.json({ id, status: data.status })
}
