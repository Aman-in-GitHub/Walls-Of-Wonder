import { Github } from 'lucide-react';
import logo from '/logo.svg';

const Footer = () => {
  return (
    <div className="flex items-center justify-between font-primary">
      <div className="w-12">
        <a href="">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <p className="md:text-lg lg:text-2xl font-semibold text-white">
        Every Wallpaper Has A Story
      </p>
      <a
        href="https://github.com/Aman-in-GitHub/Walls-Of-Wonder"
        target="_blank"
      >
        <Github className="scale-[1.2] text-white cursor-pointer hover:scale-[1.3] duration-300 active:scale-[1.1]" />
      </a>
    </div>
  );
};

export default Footer;
