import React from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import EventCard from '../EventCard/EventCard';
import classes from './EventCardCarousel.module.css';

const EventCardCarousel = (props) => {
  return (
    <CarouselProvider
      className={classes.Carousel}
      naturalSlideWidth={250}
      naturalSlideHeight={330}
      visibleSlides={4}
      totalSlides={8}
    >
      <Slider>
        <Slide index={0}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={1}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={2}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={3}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={4}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={5}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={6}>
          <EventCard></EventCard>
        </Slide>
        <Slide index={7}>
          <EventCard></EventCard>
        </Slide>
      </Slider>
      <ButtonBack className={classes.BackBtn}>
        <i className='fas fa-chevron-left'></i>
      </ButtonBack>
      <ButtonNext className={classes.ForwardBtn}>
        <i className='fas fa-chevron-right'></i>
      </ButtonNext>
    </CarouselProvider>
  );
};

export default EventCardCarousel;
