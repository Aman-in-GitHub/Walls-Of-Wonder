import logo from '/logo.svg';

import { Search } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';
import { useContext, useRef } from 'react';
import { QueryContext } from '@/context/QueryContext';

import { useToast } from '@/components/ui/use-toast';
import { DialogSearch } from '@/components/DialogSearch';

const isPhoneWidth = window.innerWidth < 726;

const Navbar = () => {
  const inputRef = useRef('');
  const { toast } = useToast();
  const { query, setQuery } = useContext(QueryContext);

  const handleSearch = (e) => {
    e.preventDefault();

    if (inputRef.current) {
      setQuery(inputRef.current);
    } else {
      toast({
        description: 'Enter something in the search box'
      });
    }
  };

  return (
    <nav className="flex items-center justify-between px-2 md:px-10 lg:px-20 bg-[#f4f4f4] dark:bg-[#232323] select-none py-2 md:py-4">
      <div className="w-12 md:w-16">
        <a href="">
          <img src={logo} alt="Logo" />
        </a>
      </div>

      {!isPhoneWidth && (
        <form
          className="flex items-center gap-2
          bg-white dark:bg-[#333333] pr-6 py-1 rounded-sm"
          onSubmit={(e) => {
            handleSearch(e);
          }}
        >
          <input
            type="text"
            placeholder="Search Wallpaper"
            className=" outline-none px-4 py-2 text-xl rounded-sm dark:bg-[#333333] dark:text-white w-[505px]"
            defaultValue={inputRef.current}
            onChange={(e) => (inputRef.current = e.target.value)}
          />
          <button type="submit">
            <Search className="scale-[1.5] text-orange-400" />
          </button>
        </form>
      )}

      <div className="flex items-center gap-6">
        <button className="md:hidden">
          <DialogSearch />
        </button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
