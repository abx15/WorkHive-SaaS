"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { WorkspaceSwitcher } from "./workspace/WorkspaceSwitcher";
import { ThemeToggle } from "./theme-toggle";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  Phone, 
  Settings, 
  Zap,
  Globe,
  Activity
} from "lucide-react";
import { useState } from "react";

export function Navbar({ showSwitcher }: { showSwitcher?: boolean }) {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    product: false,
    company: false,
    resources: false
  });

  return (
    <nav className="border-b glass border-border/50 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-8 bg-primary rounded-md flex items-center justify-center font-bold text-primary-foreground glow-yellow transition-all duration-300 group-hover:scale-110">
              W
            </div>
            <span className="font-bold text-xl tracking-tight hidden md:inline bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">WorkHive</span>
          </Link>
          {showSwitcher && <WorkspaceSwitcher />}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <DropdownMenu open={dropdownStates.product} onOpenChange={(open) => setDropdownStates(prev => ({ ...prev, product: open }))}>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
              Product <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => window.location.href = '/features'} className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Features
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/integrations'} className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Integrations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/pricing'} className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Pricing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/changelog'} className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Changelog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/status'} className="flex items-center gap-2">
                <Activity className="h-4 w-4" /> Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={dropdownStates.company} onOpenChange={(open) => setDropdownStates(prev => ({ ...prev, company: open }))}>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
              Company <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => window.location.href = '/about'} className="flex items-center gap-2">
                <Home className="h-4 w-4" /> About Us
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/blog'} className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/careers'} className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> Careers
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/contact'} className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={dropdownStates.resources} onOpenChange={(open) => setDropdownStates(prev => ({ ...prev, resources: open }))}>
            <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
              Resources <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => window.location.href = '/help'} className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Help Center
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/docs'} className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Documentation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/api'} className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> API Reference
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/privacy'} className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Privacy Policy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/terms'} className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Terms of Service
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {session ? (
            <>
              <Link href="/dashboard" className={buttonVariants({ variant: "ghost", className: "hidden md:inline-flex" })}>Dashboard</Link>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })} className="hidden md:inline-flex">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonVariants({ variant: "ghost", className: "hidden md:inline-flex" })}>Log in</Link>
              <Link href="/register" className={buttonVariants({ variant: "default", className: "hidden md:inline-flex" })}>Sign up</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t glass border-border/50 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <Link href="/features" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Zap className="mr-2 h-4 w-4" /> Features
              </Link>
              <Link href="/integrations" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Globe className="mr-2 h-4 w-4" /> Integrations
              </Link>
              <Link href="/pricing" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Briefcase className="mr-2 h-4 w-4" /> Pricing
              </Link>
              <Link href="/about" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Home className="mr-2 h-4 w-4" /> About Us
              </Link>
              <Link href="/blog" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <FileText className="mr-2 h-4 w-4" /> Blog
              </Link>
              <Link href="/careers" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Briefcase className="mr-2 h-4 w-4" /> Careers
              </Link>
              <Link href="/contact" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Phone className="mr-2 h-4 w-4" /> Contact
              </Link>
              <Link href="/help" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Users className="mr-2 h-4 w-4" /> Help Center
              </Link>
              <Link href="/docs" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <FileText className="mr-2 h-4 w-4" /> Documentation
              </Link>
              <Link href="/status" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                <Activity className="mr-2 h-4 w-4" /> Status
              </Link>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              {session ? (
                <>
                  <Link href="/dashboard" className={buttonVariants({ variant: "default", className: "w-full" })}>Dashboard</Link>
                  <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })} className="w-full">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className={buttonVariants({ variant: "ghost", className: "w-full" })}>Log in</Link>
                  <Link href="/register" className={buttonVariants({ variant: "default", className: "w-full" })}>Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
