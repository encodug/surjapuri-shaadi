import { useEffect, useState } from 'react';

function BlurredImage({src, ...props}) {
  const [blurredSrc, setBlurredSrc] = useState('');

  useEffect(() => {
    // Function to load the image, apply the blur effect, and convert to data:image format
    const applyBlurEffect = async () => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.filter = 'blur(60px)'; // Adjust the blur amount as needed
        context.drawImage(image, 0, 0, image.width, image.height);

        // Convert the canvas to a data URL
        const blurredDataUrl = canvas.toDataURL('image/jpeg'); // You can specify the image format here

        setBlurredSrc(blurredDataUrl);
      };
    };

    applyBlurEffect();
  }, [src]);

  return (
    <img src={blurredSrc} {...props} />
  );
}

export default BlurredImage;
