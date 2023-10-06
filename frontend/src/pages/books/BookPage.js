import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Card } from 'react-bootstrap';
import styles from '../../styles/BookPage.module.css';
import buttonstyles from '../../styles/Button.module.css'
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Review from '../reviews/Review';


function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
      const handleMount = async () => {
        try {
            const responseBook = await axiosReq.get(`/api/books/${id}`);
            setBook(responseBook.data);
            console.log(book)
        } catch(err){
            console.log(err)
        }
      };
      handleMount()
    }, [id])


  return (
    <Container className={styles.Container}>
        <Row>
            <Col>
              <Card className={styles.Image}>
                <img src={book.cover_image} alt={book.title} />
              </Card>
              <div className='m-2'>Number of Reviews</div>
              <Link to={`/books/${id}/reviews`} className={buttonstyles.Button}>Review This Book</Link>
            </Col>
            <Col xs={12} md={8}>
              <div className={styles.BookInfo}>
                  <div>
                    <div className={styles.Title}>
                      {book.title}
                    </div>
                    <div className="mb-2 text-muted">
                     by: {book.author}
                    </div>
                  </div>
                  <div>
                    5 star review
                    <span>{book.average_rating}</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-bookmark"></i>
                  </div>
              </div>
                  <div className={styles.description}>{book.description}</div> 
            </Col>
        </Row>
        <Row className={styles.Row}>
          Related books
        </Row>
        <Row className={styles.Row}>
          <Review />
        </Row>
    </Container>
  )
}

export default BookPage;