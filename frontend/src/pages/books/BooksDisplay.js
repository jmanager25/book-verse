import React from 'react';
import styles from '../../styles/Book.module.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const BooksDisplay = (props) => {
const {
    id,
    title,
    cover_image,
    author,
} = props

  return (
    <div className={styles.BookContainer}>
        <Card className={styles.Card}>
             <Link to={`/books/${id}`} className={styles.Link}>
                <Card.Img variant='top' src={cover_image} alt={title} className={styles.CardImage} />
            </Link>
        </Card>
        <div className={styles.Title}>{title}</div>
        <div className={styles.Author}> by {author}</div>
    </div>
  )
}

export default BooksDisplay;