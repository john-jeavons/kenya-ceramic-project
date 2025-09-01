import { AdminHeader } from "@/components/admin-header"
import { OrderStats } from "@/components/order-stats"
import { OrdersTable } from "@/components/orders-table"

export const metadata = {
  title: "Admin Dashboard - Kenya Ceramic Project",
  description: "Manage orders, customers, and analytics for CeraMaji water filters.",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your CeraMaji water filter orders and customers.</p>
          </div>

          <OrderStats />
          <OrdersTable />
        </div>
      </main>
    </div>
  )
}
