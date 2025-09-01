import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Users, BarChart3 } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-lg font-bold">CeraMaji Admin</h1>
                <p className="text-xs text-muted-foreground">Order Management</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Package className="w-4 h-4" />
                Orders
              </Link>
              <Link
                href="/admin/customers"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Users className="w-4 h-4" />
                Customers
              </Link>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary">Admin Panel</Badge>
            <Button asChild variant="outline" size="sm">
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
