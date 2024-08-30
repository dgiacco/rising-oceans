interface CommonButtonProps {
  label: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<CommonButtonProps> = ({
  label,
  className = "",
  disabled = false,
}) => {
  return (
    <button className="inline-flex items-center justify-center px-4 py-2 rounded-md font-bold bg-roAquaBlue text-roTeal">
      {label}
    </button>
  );
};

export default Button;
