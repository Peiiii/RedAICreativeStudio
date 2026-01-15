
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "xhs-bg-red text-white shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5",
    secondary: "bg-white text-gray-900 shadow-xl border border-gray-100 hover:bg-gray-50",
    outline: "bg-transparent border-2 xhs-border-red xhs-text-red hover:bg-red-50",
    ghost: "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-8 py-3.5 text-base rounded-full",
    lg: "px-10 py-5 text-xl rounded-full"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
