import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={images.length}
      isIntrinsicHeight
    >
      <Slider>
        {images.map((img, i) => (
          <Slide index={i} key={img.original}>
            <Image src={img.original} />
          </Slide>
        ))}
      </Slider>
      <DotGroup />
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
}

export default Gallery;
