import React from 'react';
import {FaStar} from 'react-icons/fa';
import styles from '../styles/StarRating.module.css'

const StarRating = ({value, onChange}) => {
  const stars = Array(5).fill(0);

  return (
    <div className={styles.StarRating}>
        {stars.map((_, index) => {
            const ratingValue = index + 1
            return (
                <FaStar 
                  key={index} 
                  className={styles.Star}
                  onClick={() => onChange(ratingValue)}
                />)
        })}
    </div>
  );
}

export default StarRating;