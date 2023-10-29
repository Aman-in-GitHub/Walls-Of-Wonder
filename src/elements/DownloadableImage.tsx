import React, { useState } from 'react';

const DownloadableImage = ({ image }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadImage = async () => {
    setIsDownloading(true);

    const response = await fetch(image.path);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'HELLO';
    link.click();

    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  return (
    <button onClick={downloadImage} disabled={isDownloading}>
      Download Image
    </button>
  );
};

export default DownloadableImage;
