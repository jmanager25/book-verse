import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Card, OverlayTrigger, Tooltip, Carousel } from 'react-bootstrap';
import styles from '../../styles/BookPage.module.css';
import buttonstyles from '../../styles/Button.module.css'
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Review from '../reviews/Review';
import StarRating from '../../components/StarRating';
import { useCurrentUser } from '../../context/currentUserContext';
import useAlert from '../../hooks/useAlert';
import BooksDisplay from './BooksDisplay';


function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [review, setReview] = useState([]);
    const { setAlert } = useAlert();
    const [relatedBooks, setRelatedBooks] = useState([]);
    const currentUser = useCurrentUser();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [bookResponse, reviewResponse] = await Promise.all([
            axiosReq.get(`/api/books/${id}`),
            axiosReq.get(`/api/reviews/?book=${id}`),
          ]);
  
          setBook(bookResponse.data);
          setReview(reviewResponse.data);
  
          if (bookResponse.data.genre) {
            const relatedBooksResponse = await axiosReq.get(`/api/books/?genre=${bookResponse.data.genre}`);
            const filteredRelatedBooks = relatedBooksResponse.data.filter((relatedBook) => relatedBook.id !== bookResponse.data.id);
            setRelatedBooks(filteredRelatedBooks);
          }

        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, [id]);


    const handleSave = async () => {
      try {
        if (!book.saved_id) {
          const { data } = await axiosRes.post('/api/saved-books/', { book: id });
          setBook((prevBook) => ({ ...prevBook, saved_id: data.id }));
          setAlert( 'Book saved successfully', 'success');

        } else {
          await axiosRes.delete(`/api/saved-books/${book.saved_id}/`);
          setBook((prevBook) => ({ ...prevBook, saved_id: null }));
          setAlert( 'Book unsaved successfully', 'success');
        }

      } catch (err) {
        console.error(err);
        setAlert('Failed to save book', 'error');
      }
    };

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
                    <StarRating value={book.average_rating} />
                    <span>{book.average_rating}</span>
                  </div>
                  <div>
                  {currentUser ? (
                    <span onClick={handleSave}>
                      {book.saved_id ? (
                        <i className="fa-solid fa-bookmark"></i>
                      ) : (
                        <i className="fa-regular fa-bookmark"></i>
                      )}
                    </span>
                  ) : (
                    <OverlayTrigger placement="top" overlay={<Tooltip>Log in to save book</Tooltip>}>
                      <i className="fa-regular fa-bookmark"></i>
                    </OverlayTrigger>
                  )}
                  </div>
              </div>
                  <div className={styles.description}>{book.description}</div> 
            </Col>
        </Row>
        <Row className={styles.Row}>
        <hr/>
        <h5 className='text-center'>Related Books</h5>
        <hr/>
        {relatedBooks.length ? (
                <Carousel indicators={false}>
                    {relatedBooks.map((book) => (
                        <Carousel.Item key={book.id}>
                            <BooksDisplay {...book} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p className='text-center'><strong>No related books found</strong></p>
            )}
        </Row>
        <Row className={styles.Row}>
         {review.map((review) => (
            <Review key={review.id} {...review} setReviews={setReview} />
          ))}
        </Row>
    </Container>
  )
}

export default BookPage;