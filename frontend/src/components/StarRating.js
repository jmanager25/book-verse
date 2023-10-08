import React from 'react';
import {FaStar} from 'react-icons/fa';
import styles from '../styles/StarRating.module.css'

const StarRating = ({value, onChange}) => {
  const stars = Array(5).fill(0);

  const handleStarClick = (ratingValue) => {
    if (onChange) {
      onChange(ratingValue);
    }
  };

  return (
    <div className={styles.StarRating}>
        {stars.map((_, index) => {
            const ratingValue = index + 1
            return (
                <FaStar 
                  key={index} 
                  className={styles.Star}
                  onClick={() => handleStarClick(ratingValue)}
                  color={value >= ratingValue ? 'yellow' : 'grey'}
                />)
        })}
    </div>
  );
}

export default StarRating;