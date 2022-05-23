import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

function Gallery(props) {
  const { style } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgs = [];
    style.photos.forEach((photo) => {
      imgs.push({
        original: photo.url,
        thumbnail: photo.thumbnail_url,
      });
    });
    setImages(imgs);
  }, [style]);

  return (
    <ImageGallery
      items={images}
      infinite={false}
      thumbnailPosition="left"
      disableThumbnailScroll
      showPlayButton={false}
      useBrowserFullScreen={false}
    />
  );
}

export default Gallery;
