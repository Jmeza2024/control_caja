"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {

  const router = useRouter()
  const [users, setUser] = useState<any>(null)

  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [total, setTotal] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleSale = async () => {
    if (!product || !quantity || !total) {
      alert("Todos los campos son obligatorios")
      return
    }

    await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product,
        quantity: Number(quantity),
        total: Number(total),
        user_id: users.id
      })
    })

    alert("Venta registrada")

    setProduct("")
    setQuantity("")
    setTotal("")
  }

  if (!users) return null

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-semibold mb-8">Sistema Ventas</h2>

        <nav className="space-y-4">
          <button className="block w-full text-left hover:text-gray-300">
            Dashboard
          </button>

          <button className="block w-full text-left hover:text-gray-300">
            Ventas
          </button>

          {users.role === "admin" && (
            <button className="block w-full text-left hover:text-gray-300">
              Usuarios
            </button>
          )}

          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-400 hover:text-red-300 mt-8"
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
          Bienvenido, {users.name}
        </h1>

        <div
  style={{
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    marginTop: "20px"
  }}
>
  <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>
    Registrar Venta
  </h3>

  <input
    type="text"
    placeholder="Producto"
    value={product}
    onChange={(e) => setProduct(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px"
    }}
  />

  <input
    type="number"
    placeholder="Cantidad"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px"
    }}
  />

  <input
    type="number"
    placeholder="Total"
    value={total}
    onChange={(e) => setTotal(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "6px"
    }}
  />

  <button
    onClick={handleSale}
    style={{
      width: "100%",
      padding: "14px",
      backgroundColor: "black",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Registrar Venta
  </button>
</div>
      </main>
    </div>
  )
}