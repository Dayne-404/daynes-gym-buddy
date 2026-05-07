import { Link } from "react-router-dom";

interface LoginRedirectProps {
  text: string;
  linkText: string;
  to: string;
  disabled?: boolean;
}

const AuthRedirect = ({
  text,
  linkText,
  to,
  disabled = false,
}: LoginRedirectProps) => {
  return (
    <p className="text-center">
      {text}{" "}
      {disabled ? (
        <span className="text-secondary cursor-not-allowed">
          {linkText}
        </span>
      ) : (
        <Link to={to} className="text-secondary">
          {linkText}
        </Link>
      )}
    </p>
  );
};

export default AuthRedirect;
