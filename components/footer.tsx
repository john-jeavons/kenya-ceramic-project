import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/ceramaji-logo.png"
                alt="CeraMaji Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-bold">CeraMaji</h3>
                <p className="text-xs text-muted-foreground">Water for Life</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Providing affordable ceramic water filters to improve health and empower communities across Western Kenya.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-muted-foreground hover:text-primary">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-muted-foreground hover:text-primary">
                  Order Filter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="text-muted-foreground hover:text-primary">
                  Maintenance Guide
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-muted-foreground hover:text-primary">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Kiminini, Trans Nzoia County</p>
              <p>Western Kenya</p>
              <p>+254 700 123 456</p>
              <p>info@ceramaji.co.ke</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Kenya Ceramic Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
