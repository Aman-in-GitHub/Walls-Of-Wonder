import { Search } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useRef, useContext } from 'react';
import { QueryContext } from '@/context/QueryContext';
import { useToast } from '@/components/ui/use-toast';

export function DialogSearch() {
  const searchRef = useRef('');
  const { query, setQuery } = useContext(QueryContext);
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchRef.current) {
      setQuery(searchRef.current);
    } else {
      toast({
        description: 'Enter something in the search box'
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer duration-300 scale-125 md:active:scale-90 text-orange-500 md:hover:scale-125 outline-none border-none">
          <Search />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Search
          </DialogTitle>
        </DialogHeader>
        <form className="flex items-center" onSubmit={(e) => handleSearch(e)}>
          <div className="grid flex-1">
            <label htmlFor="link" className="sr-only">
              Search
            </label>
            <input
              type="text"
              placeholder="Search Wallpapers"
              className="px-3 py-1 font-normal outline-none border focus:border-0 focus:ring-orange-500 focus:ring-2 rounded-sm text-lg w-[95%] text-black dark:text-white"
              style={{
                background: 'transparent'
              }}
              onChange={(e) => (searchRef.current = e.target.value)}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                className="cursor-pointer scale-125 duration-200 active:scale-100 text-orange-500"
                type="submit"
              >
                <Search />
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
