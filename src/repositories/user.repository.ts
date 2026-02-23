import { User } from "../models/User"

const users: User[] = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@fossil.com",
    password: "123456",
    role: "admin",
    createdAt: new Date()
  }
]

export class UserRepository {

  async findByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email === email)
    return user || null
  }

  async create(user: User): Promise<User> {
    users.push(user)
    return user
  }

}