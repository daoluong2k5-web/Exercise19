import React from 'react';
import PropTypes from 'prop-types';
import checkPropTypes from 'prop-types/checkPropTypes';
import './AnimalCard.css';

import lionImg from '../../images/lion.png';
import gorillaImg from '../../images/gorilla.png';
import zebraImg from '../../images/zebra.png';

const imageMap = {
  lion: lionImg,
  gorilla: gorillaImg,
  zebra: zebraImg
};

export default function AnimalCard({
  additional = AnimalCard.defaultProps?.additional,
  diet,
  name,
  scientificName,
  showAdditional,
  size
}) {
  if (process.env.NODE_ENV !== 'production' && AnimalCard.propTypes) {
    checkPropTypes(
      AnimalCard.propTypes,
      { additional, diet, name, scientificName, showAdditional, size },
      'prop',
      'AnimalCard'
    );
  }

  const currentAdditional = additional || AnimalCard.defaultProps?.additional;
  const imageSrc = imageMap[name?.toLowerCase()] || `/images/${name?.toLowerCase()}.png`;

  return (
    <div className="animal-wrapper">
      <img
        src={imageSrc}
        alt={name}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <h2>{name}</h2>
      <div className="animal-details">
        <div>Scientific Name: {scientificName}</div>
        <div>{size} kg</div>
        <div>{diet ? `${diet.join(', ')}.` : ''}</div>
      </div>
      <button onClick={() => showAdditional(currentAdditional)}>
        More Info
      </button>
    </div>
  );
}

AnimalCard.propTypes = {
  additional: PropTypes.shape({
    link: PropTypes.string,
    notes: PropTypes.string
  }),
  diet: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  showAdditional: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

AnimalCard.defaultProps = {
  additional: {
    notes: 'No Additional Information',
    link: 'No Additional Information'
  }
};
