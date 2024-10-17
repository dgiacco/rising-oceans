import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@/components/Button";

interface ConnectCardProps {
  onContinue: () => void;
}

const ConnectCard: React.FC<ConnectCardProps> = ({ onContinue }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-2 border-roAquaBlue rounded-lg shadow-md p-6 max-w-lg w-full mx-4 sm:mx-auto backdrop-blur">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-slate-400">
          Welcome to{" "}
          <span className="text-roAquaBlue font-quicksand font-bold">
            Rising Oceans
          </span>
          !
        </h2>
        <p className="text-center text-slate-400 sm:text-lg">
          Connect your wallet to access all features, or proceed as a guest.
        </p>

        <div className="flex flex-col items-center gap-4 pt-12">
          <div className="flex flex-row items-center gap-4">
            <ConnectButton />
            <Button
              label="Im a Guest"
              variant="secondary"
              onClick={onContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectCard;
