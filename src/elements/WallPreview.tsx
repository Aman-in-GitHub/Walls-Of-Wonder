import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const WallPreview = ({ image }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const bg = image.thumbs.large;

  async function downloadImage(url, name) {
    const imageURL = `http://localhost:3000/hosted-image?imageUrl=${url}`;

    try {
      setIsDownloading(true);
      const response = await fetch(imageURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Walls_Of_Wonder-${name}.png`;
      link.click();

      URL.revokeObjectURL(url);
      setIsDownloading(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        description: 'Error downloading image'
      });
      setIsDownloading(false);
    }
  }
  return (
    <div
      className="bg-center bg-cover bg-no-repeat aspect-video cursor-pointer group rounded-sm"
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <div className="h-full w-full justify-between items-end flex opacity-0 group-hover:opacity-100 duration-300">
        <a
          href={`http://localhost:3000/hosted-image?imageUrl=${image.path}`}
          target="_blank"
          className="bg-orange-400 dark:bg-orange-900 shadow text-white px-3 py-1 text-lg font-semibold rounded-sm"
        >
          Preview
        </a>
        {isDownloading ? (
          <button
            disabled
            className="bg-orange-400 dark:bg-orange-900 shadow text-white px-3 py-1 text-lg font-semibold flex items-center disabled:opacity-75 rounded-sm"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading
          </button>
        ) : (
          <button
            className="bg-orange-400 dark:bg-orange-900 shadow text-white px-3 py-1 text-lg font-semibold rounded-sm"
            onClick={() => downloadImage(image.path, image.id)}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default WallPreview;
