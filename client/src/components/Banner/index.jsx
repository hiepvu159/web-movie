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

  return (
    <div className="banner">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        autoplay
        speed={500}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {movies.map((movie) => (
          <SwiperSlide>
            <div>
              <img src={movie.thumb_url} alt="thumb" className="swiper-img" />
              <div className="swiper-info">
                <div className="swiper-name">{movie.name}</div>
                <div className="flex">
                  {movie?.category?.map((ctg) => {
                    return (
                      <>
                        {ctg
                          ?.split(",")
                          .concat()
                          .map((item) => (
                            <div className="swiper-category">{item}</div>
                          ))}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
