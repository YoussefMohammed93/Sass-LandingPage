import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "secondary";
}

export const Button = ({
  variant = "default",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "font-light px-5 sm:px-7 py-2.5 rounded-full transition-colors duration-150";

  const variantClasses = {
    default: "bg-primary text-white hover:bg-primary-90",
    secondary: "bg-white text-primary hover:bg-white/90",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
