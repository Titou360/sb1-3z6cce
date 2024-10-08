'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const plugins = [
  {
    name: 'Housekeeping Manager',
    description: 'Efficiently manage room cleaning schedules and tasks.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Maintenance Tracker',
    description: 'Keep track of maintenance requests and schedule repairs.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    name: 'Guest Communication',
    description: 'Streamline guest communication and manage requests.',
    image: 'https://images.unsplash.com/photo-1576267423048-15c0040fec78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const PluginShowcase = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoplayPlugin()]);
  const [isPaused, setIsPaused] = useState(false);

  const onMouseEnter = useCallback(() => {
    if (emblaApi) emblaApi.plugins().autoplay.stop();
    setIsPaused(true);
  }, [emblaApi]);

  const onMouseLeave = useCallback(() => {
    if (emblaApi) emblaApi.plugins().autoplay.play();
    setIsPaused(false);
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('mouseEnter', onMouseEnter);
      emblaApi.on('mouseLeave', onMouseLeave);
    }
    return () => {
      if (emblaApi) {
        emblaApi.off('mouseEnter', onMouseEnter);
        emblaApi.off('mouseLeave', onMouseLeave);
      }
    };
  }, [emblaApi, onMouseEnter, onMouseLeave]);

  return (
    <section className="bg-white py-16" id="learn-more">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Powerful Plugins</h2>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {plugins.map((plugin, index) => (
              <div className="embla__slide" key={index}>
                <Card className="mx-4">
                  <CardHeader>
                    <CardTitle>{plugin.name}</CardTitle>
                    <CardDescription>{plugin.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={plugin.image}
                      alt={plugin.name}
                      width={400}
                      height={225}
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center mt-4 text-sm text-gray-500">
          {isPaused ? 'Slider paused. Hover out to resume.' : 'Slider active. Hover to pause.'}
        </p>
      </div>
    </section>
  );
};

export default PluginShowcase;