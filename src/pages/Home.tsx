import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import WallPreview from '../elements/WallPreview';

import { QueryContext } from '@/context/QueryContext';

import { Switch } from '@/components/ui/switch';

import NOTFOUND from '/notFound.svg';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Loader from '@/elements/Loader';
import Loader2 from '@/elements/Loader2';
import Footer from '@/elements/Footer';

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const resolutions = {
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '1440p': { width: 2560, height: 1440 },
  '4K': { width: 3840, height: 2160 }
};

const mediaQueryPortrait = window.matchMedia('(orientation: portrait)');
const mediaQueryLandscape = window.matchMedia('(orientation: landscape)');

function Home() {
  const { ref, inView } = useInView();

  const { query } = useContext(QueryContext);

  const [orientation, setOrientation] = useState(null);
  const [resolution, setResolution] = useState(null);
  const [ratios, setRatios] = useState('16x9');
  const [quality, setQuality] = useState('1920x1080');
  const [hasNSFW, setHasNSFW] = useState(false);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    const res = getResolution(screenWidth, screenHeight);
    setResolution(res);
    checkOrientation();
  }, []);

  const { hasNextPage, isFetchingNextPage, fetchNextPage, data, isLoading } =
    useInfiniteQuery({
      queryKey: ['HomeWallpaper', query, ratios, quality, hasNSFW],

      queryFn: ({ pageParam = 1 }) => fetchWallpapers(pageParam),

      getNextPageParam: (lastPage) => {
        return lastPage.meta.current_page < lastPage.meta.last_page
          ? lastPage.meta.current_page + 1
          : undefined;
      }
    });

  useEffect(() => {
    let RESOLUTIONS = '';
    let ORIENTATIONS = '';

    if (orientation === 'square') {
      ORIENTATIONS = '1x1,4x3,3x2,5x4';
    } else if (orientation === 'horizontal') {
      ORIENTATIONS = '16x9,16x10,21x9,32x9,48x9';
    } else {
      ORIENTATIONS = '9x16,10x16,9x18';
    }

    if (resolution === '720p') {
      RESOLUTIONS =
        orientation === 'vertical'
          ? '720x1280,800x1280,960x1280,1024x1280'
          : '1280x720,1280x800,1280x960,1280x1024';
    } else if (resolution === '1080p') {
      RESOLUTIONS =
        orientation === 'vertical'
          ? '1080x1920,1200x1920,1440x1920'
          : '1920x1080,1920x1200,1920x1440';
    } else if (resolution === '1440p') {
      RESOLUTIONS =
        orientation === 'vertical'
          ? '1440x2560,1600x2560,1920x2560,2048x2560'
          : '2560x1440,2560x1600,2560x1920,2560x2048';
    } else {
      RESOLUTIONS =
        orientation === 'vertical'
          ? '2160x3840,2400x3840,2880x3840,3072x3840'
          : '3840x2160,3840x2400,3840x2880,3840x3072';
    }

    setRatios(ORIENTATIONS);
    setQuality(RESOLUTIONS);
  }, [orientation, resolution]);

  async function fetchWallpapers(pageParam) {
    const response = await axios.get('http://localhost:3000/api', {
      params: {
        q: query,
        page: pageParam,
        purity: hasNSFW ? '111' : '100',
        ratios: ratios,
        resolutions: quality
      }
    });

    return response.data;
  }

  function checkOrientation() {
    if (mediaQueryPortrait.matches) {
      setOrientation('vertical');
    } else if (mediaQueryLandscape.matches) {
      setOrientation('horizontal');
    } else {
      setOrientation('square');
    }
  }

  function getResolution(width, height) {
    for (const name in resolutions) {
      const resolution = resolutions[name];
      if (width >= resolution.width && height >= resolution.height) {
        return name;
      }
    }
  }

  return (
    <main className="select-none dark:text-white">
      <header className="flex flex-wrap items-center justify-center gap-4 md:gap-36 bg-[#f4f4f4] dark:bg-[#232323] pb-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            onCheckedChange={(e) => setHasNSFW(e)}
            checked={hasNSFW}
          />
          <label htmlFor="airplane-mode">NSFW</label>
        </div>
        <div className="flex items-center gap-4">
          <Select value={resolution} onValueChange={(e) => setResolution(e)}>
            <SelectTrigger className="w-[165px]">
              <SelectValue placeholder="Select a resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Resolution</SelectLabel>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
                <SelectItem value="1440p">1440p</SelectItem>
                <SelectItem value="4K">4K</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={orientation} onValueChange={(e) => setOrientation(e)}>
            <SelectTrigger className="w-[165px]">
              <SelectValue placeholder="Select an orientation" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Orientation</SelectLabel>

                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
                <SelectItem value="square">Square</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <Loader2 />
        </div>
      ) : data?.pages[0]?.data.length == 0 && !hasNextPage ? (
        <div className="flex justify-center items-center h-[70vh]">
          <img
            src={NOTFOUND}
            alt="Nothing Found Illustration"
            className="w-[333px] md:w-[500px]"
          />
        </div>
      ) : (
        <div className="px-2 md:px-10 lg:px-20 mt-2 md:mt-4">
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {data?.pages.map((page) =>
              page?.data.map((image) => (
                <WallPreview key={image.id} image={image} />
              ))
            )}
          </section>
          <div
            ref={ref}
            onClick={() => fetchNextPage()}
            className="flex items-center justify-center py-2"
          >
            {isFetchingNextPage && hasNextPage && <Loader />}
          </div>
        </div>
      )}

      {data?.pages[0]?.data.length > 8 && !hasNextPage && (
        <footer className="px-2 md:px-10 lg:px-20 bg-orange-400 py-2">
          <Footer />
        </footer>
      )}
    </main>
  );
}

export default Home;
