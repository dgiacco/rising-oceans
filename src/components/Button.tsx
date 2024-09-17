interface CommonButtonProps {
  label: string;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<CommonButtonProps> = ({ label, type, disabled }) => {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-bold bg-roAquaBlue text-roTeal ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
