const Footer = () => {
  return (
    <footer
      className="
    flex 
    flex-col
    sm:flex-row 
    justify-between 
    items-center 
    p-3
    sm:p-5 
    bg-transparent 
    shadow-md
    border-t 
    border-t-2 
    border-roTeal
    backdrop-blur
  "
    >
      <div className="text-roAquaBlue text-xs sm:text-sm text-center sm:text-left mb-2 sm:mb-0">
        <p>© 2024 Rising Oceans. All rights reserved.</p>
      </div>

      <div>
        <ul className="flex flex-row sm:flex-row space-x-2 sm:space-x-4 text-xs sm:text-sm">
          <li className="text-roAquaBlue cursor-pointer">Privacy policy</li>
          <li className="text-roAquaBlue cursor-pointer">Terms of service</li>
          <li className="text-roAquaBlue cursor-pointer">Contact</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
