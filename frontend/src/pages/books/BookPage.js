import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Card } from 'react-bootstrap';
import styles from '../../styles/BookPage.module.css';
import buttonstyles from '../../styles/Button.module.css'
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState({results: []});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: book}] = await Promise.all([
                    await axiosReq.get(`/api/books/${id}`)
                ]);
                setBook({results: [book]});
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
                image goes here
              </Card>
              <div>Number of Reviews</div>
              <Link to={`/books/${id}/reviews`} className={buttonstyles.Button}>Review This Book</Link>
            </Col>
            <Col xs={12} md={8}>
              <div className={styles.BookInfo}>
                  <div>
                    <div className={styles.Title}>
                      book tilte goes here
                    </div>
                    <div className="mb-2 text-muted">
                     Author name goes here
                    </div>
                  </div>
                  <div>
                    5 star review
                    <span>Average rating</span>
                  </div>
                  <div>
                    Save book Icon
                  </div>
              </div>
                  <Card.Text className={styles.Summary}>description of the book goes here</Card.Text> 
            </Col>
        </Row>
        <Row>
            related books
        </Row>
        <Row>
              
        </Row>
    </Container>
  )
}

export default BookPage;