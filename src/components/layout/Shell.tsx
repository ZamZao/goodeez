import React from 'react'

interface ShellProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export default function Shell({ children, maxWidth = 'xl' }: ShellProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${maxWidthClasses[maxWidth]}`}>
          {children}
        </div>
      </main>
    </div>
  )
}
