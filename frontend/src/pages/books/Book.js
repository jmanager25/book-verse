import React, { useEffect, useState } from 'react'
import styles from '../../styles/Book.module.css';
import buttonstyles from '../../styles/Button.module.css'
import {Container, Row, Button, Card} from "react-bootstrap";
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Book = () => {
    const [books, setBooks] = useState([]);
        
    useEffect(() => {
        const handleMount = async () => {
            try {
                const response = await axiosReq.get('/api/books/')
                setBooks(response.data);
            }catch(err) {
                console.log(err)
            }
        };
        handleMount();
    }, [])

  return (
    <Container className={styles.Container}>
        <Row xs={1} md={3} lg={4}>
            {books.map((book) => (
                <div key={book.id} className={styles.BookContainer}>
                    <Card className={styles.Card}>
                        <Link to={`books/${book.id}`} className={styles.Link}>
                            <Card.Img variant='top' src={book.cover_image} alt={book.title} className={styles.CardImage} />
                        </Link>
                    </Card>
                    <div className={styles.Title}>{book.title}</div>
                    <div className={styles.Author}> by {book.author}</div>
                    <div className={styles.CardBody}>
                        <div className='text-center'>
                                <Button className={buttonstyles.Button}>Save Book</Button>
                        </div>
                    </div>
                </div>
            ))}
        </Row>
    </Container>
  )
}

export default Book;