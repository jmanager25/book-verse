import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import styles from '../../styles/ReviewCreateEditForm.module.css'
import buttonstyles from '../../styles/Button.module.css'
import appstyles from '../../App.module.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import StarRating from '../../components/StarRating';
import useAlert from '../../hooks/useAlert';

function ReviewEditForm() {
    const [errors, setErrors] = useState({});

    const [reviewData, setReviewData] = useState({
        review_text: '',
        rating: '',
    });

    const {review_text, rating} = reviewData;
    const history = useHistory();
    const {bookId, reviewId} = useParams();
    const { setAlert } = useAlert();

    useEffect(() => {
        const handleMount = async () => {
            try {
               const {data} = await axiosReq.get(`/api/reviews/${reviewId}`);
               const {review_text, rating, is_owner} = data;

               is_owner ? setReviewData({review_text, rating}) : history.push('/');
            } catch(err){
              console.log(err)
            }
        };
        handleMount();
    }, [history, reviewId])
       
    
    const handleChange = (event) => {
        setReviewData({
            ...reviewData, 
            [event.target.name]: event.target.value,
        });
    };

    const handleRatingChange = (newRating) => {
        setReviewData({
          ...reviewData,
          rating: newRating, 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('review_text', review_text);
        formData.append('rating', rating);
        formData.append('book', bookId);

        try {
          await axiosReq.put(`/api/reviews/${reviewId}`, formData);
          history.goBack()
          setAlert('review updated successfully', 'success')
        } catch(err){
          console.log(err)
          if (err.response?.status !== 401){
            setErrors(err.response?.data)
            setAlert('Failed to update review', 'error')
          }  
        }
    }

  return (
    <Container className={styles.Container}>
        <h2 className={styles.Title}>Add Review</h2>
        <Form className={styles.Form} onSubmit={handleSubmit}>
          <Form.Group controlId='review_text' className={styles.TextArea}>
              <Form.Label className={styles.FormLabel} hidden>Review Text</Form.Label>
              <Form.Control
                  className={styles.FormControl}
                  as='textarea'
                  name='review_text'
                  placeholder='Write your review here...'
                  rows={6}
                  value={review_text}
                  onChange={handleChange}
              />
          </Form.Group>
          {errors?.review_text?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
          )}
          <StarRating value={rating} onChange={handleRatingChange} />
          {errors?.rating?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
          )}
          <Button className={buttonstyles.Button} type='submit'>Submit</Button>
        </Form>
    </Container>
  )
}

export default ReviewEditForm;