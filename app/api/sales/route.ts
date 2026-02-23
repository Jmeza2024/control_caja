import { NextResponse } from "next/server"
import { pool } from "@/src/infrastructure/database"

export async function POST(req: Request) {
  try {
    const { product, quantity, total, user_id } = await req.json()

    if (!product || !quantity || !total || !user_id) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      )
    }

    const result = await pool.query(
      "INSERT INTO sales (product, quantity, total, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [product, quantity, total, user_id]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}