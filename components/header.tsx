import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/ceramaji-logo.png" alt="CeraMaji Logo" width={50} height={50} className="rounded-lg" />
          <div>
            <h1 className="text-xl font-bold text-foreground">CeraMaji</h1>
            <p className="text-sm text-muted-foreground">Water for Life</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/impact" className="text-foreground hover:text-primary transition-colors">
            Impact
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/order">Order Now</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
