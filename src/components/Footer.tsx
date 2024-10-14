const Footer = () => {
  return (
    <footer
      className="
    flex 
    justify-between 
    items-center 
    p-5 
    bg-transparent 
    shadow-md
    border-t 
    border-t-2 
    border-roTeal
    backdrop-blur
  "
    >
      <div className="text-roAquaBlue text-sm">
        <p>© 2024 Rising Oceans. All rights reserved.</p>
      </div>

      <div>
        <ul className="flex space-x-4">
          <li className="text-roAquaBlue cursor-pointer">Privacy Policy</li>
          <li className="text-roAquaBlue cursor-pointer">Terms of Service</li>
          <li className="text-roAquaBlue cursor-pointer">Contact</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
