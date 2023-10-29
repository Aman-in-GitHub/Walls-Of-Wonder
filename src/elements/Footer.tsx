import { Github } from 'lucide-react';
import logo from '/logo.svg';

const Footer = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-12">
        <a href="">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <p className="md:text-lg font-bold text-white">
        Every Wallpaper Has A Story
      </p>
      <Github className="scale-[1.2] text-white cursor-pointer hover:scale-[1.3] duration-300 active:scale-[1.1]" />
    </div>
  );
};

export default Footer;
