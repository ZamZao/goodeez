import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantStyles = {
    primary: 'bg-goodeez-blue-600 text-white hover:bg-goodeez-blue-700 focus:ring-goodeez-blue-500',
    secondary: 'bg-goodeez-blue-900 text-white hover:bg-goodeez-blue-800 focus:ring-goodeez-blue-500',
    outline: 'border-2 border-goodeez-blue-600 text-goodeez-blue-600 hover:bg-goodeez-blue-50 focus:ring-goodeez-blue-500',
    ghost: 'text-goodeez-blue-700 hover:bg-goodeez-blue-50 focus:ring-goodeez-blue-500',
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
