import { NextResponse } from "next/server"
import { AuthService } from "@/src/services/auth.service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const authService = new AuthService()
    const user = await authService.login(email, password)

    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    })

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 401 }
    )
  }
}