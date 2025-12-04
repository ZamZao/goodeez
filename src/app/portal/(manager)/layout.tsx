import Link from 'next/link';
import { ReactNode } from 'react';

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            OneStopMerch
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/portal/dashboard" icon="📊">Dashboard</NavLink>
          <NavLink href="/portal/catalog" icon="🛍️">Catalogue</NavLink>
          <NavLink href="/portal/inventory" icon="📦">Mon Stock</NavLink>
          <NavLink href="/portal/orders" icon="🚚">Commandes</NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              AC
            </div>
            <div>
              <p className="text-sm font-medium">Acme Corp</p>
              <p className="text-xs text-gray-500">Demo Mode</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, children, active }: any) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {children}
    </Link>
  );
}
