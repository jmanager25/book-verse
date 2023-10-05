import React from 'react';
import { Button } from 'react-bootstrap';
import buttonstyles from '../styles/Button.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ReviewBookButton({bookId}) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/reviews/book/${bookId}`);
    };

  return (
    <Button className={buttonstyles.Button} onClick={handleClick}>Review This Book</Button>
  )
}

export default ReviewBookButton;