import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface NavWrapperProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const NavWrapper = ({ to, children, className = "" }: NavWrapperProps) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(to)} className={`cursor-pointer transition-transform active:scale-95 ${className}`.trim()}>
      {children}
    </div>
  );
};

export default NavWrapper;
