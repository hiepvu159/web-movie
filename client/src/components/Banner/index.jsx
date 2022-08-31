import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../../services/movie";
import "./Banner.css";

function Banner() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies(setMovies);
  }, []);
  console.log(movies);
  return (
    <div className="banner">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {movies.map((movie) => (
          <SwiperSlide>
            <div className="h-1/3">
              <img src={movie.thumb_url} alt="thumb" className="thumbnail" />
              <div>
                <div className="swiper-name">{movie.name}</div>
                {movie.category.map((ctg) => (
                  <div className="swiper-category">{ctg}</div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
