import React from "react";
import PropTypes from "prop-types";

Card.propTypes = {
  name: PropTypes.string,
  poster_url: PropTypes.string,
  year: PropTypes.number,
};

function Card(props) {
  const { data } = props;
  return (
    <div className="card">
      <div>
        <img className="card-image" src={data.poster_url} alt={data.name} />
        <div className="card-desc">
          <span className="card-name">{data.name}</span>
          <span className="card-info">{data.year}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
