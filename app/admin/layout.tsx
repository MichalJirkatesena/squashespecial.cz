import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { AdminGuard } from "@/components/admin/AdminGuard";

export const metadata = { title: "Administrace | SquashEspecial", robots: "noindex" };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 py-8">{children}</div>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
}
