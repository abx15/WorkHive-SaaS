"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <div className="space-y-6 max-w-md">
        <div className="size-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl font-bold text-muted-foreground">404</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <div className="pt-4">
          <Link href="/" className={buttonVariants({ size: "lg" })}>Return Home</Link>
        </div>
      </div>
    </div>
  );
}
