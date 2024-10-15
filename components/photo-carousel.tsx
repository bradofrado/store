import * as React from 'react';

import { Card, CardContent } from '@/components/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/carousel';
import { getClass } from '@/utils/common';
import { Image } from '@/types/image';

interface PhotoCarouselProps {
  images: Image[];
  selectedImage: number;
  onSelect: (index: number) => void;
}
export const PhotoCarousel: React.FunctionComponent<PhotoCarouselProps> = ({
  images,
  selectedImage,
  onSelect,
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full max-w-sm'
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4'>
            <div className='p-1'>
              <Card
                className={getClass(
                  selectedImage === index ? 'border-gray-950' : ''
                )}
              >
                <button
                  className='flex aspect-square items-center justify-center'
                  onClick={() => onSelect(index)}
                >
                  <img src={image.imageSrc} alt={image.imageAlt} />
                </button>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
