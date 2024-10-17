type CommonButtonProps = {
  label: string;
  variant: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

import { motion } from "framer-motion";

const Button: React.FC<CommonButtonProps> = ({
  label,
  variant,
  type,
  disabled,
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold";

  const primaryStyles = "bg-roAquaBlue text-roTeal";
  const secondaryStyles = "bg-roTeal text-white";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonStyles = `${baseStyles} ${
    variant === "primary" ? primaryStyles : secondaryStyles
  } ${disabled ? disabledStyles : ""}`;

  return (
    <motion.button
      className={buttonStyles}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.05, filter: "brightness(1.25)" } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={!disabled ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {label}
    </motion.button>
  );
};

export default Button;
