import React from 'react';
import { Carousel } from 'antd';

const ImageCarousel = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3>Slide 1</h3>
      </div>
      <div>
        <h3>Slide 2</h3>
      </div>
      <div>
        <h3>Slide 3</h3>
      </div>
    </Carousel>
  );
};

export default ImageCarousel;