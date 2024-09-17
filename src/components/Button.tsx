type CommonButtonProps = {
  label: string;
  variant: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<CommonButtonProps> = ({
  label,
  variant,
  type,
  disabled,
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-bold";

  const primaryStyles = "bg-roAquaBlue text-roTeal hover:bg-roSeaGreen";
  const secondaryStyles = "bg-roTeal text-white hover:bg-roAquaBlue";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonStyles = `${baseStyles} ${
    variant === "primary" ? primaryStyles : secondaryStyles
  } ${disabled ? disabledStyles : ""}`;

  return (
    <button
      className={buttonStyles}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
