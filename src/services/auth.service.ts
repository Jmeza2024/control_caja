import { pool } from "../infrastructure/database"

export class AuthService {
  async login(email: string, password: string) {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    const user = result.rows[0]

    if (!user || user.password !== password) {
      throw new Error("Credenciales incorrectas")
    }

    return user
  }
}