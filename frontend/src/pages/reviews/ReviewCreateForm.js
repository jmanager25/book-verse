import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import styles from '../../styles/ReviewCreateEditForm.module.css'
import buttonstyles from '../../styles/Button.module.css'
import appstyles from '../../App.module.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import StarRating from '../../components/StarRating';
import useAlert from '../../hooks/useAlert';

function ReviewCreateForm() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id: bookId } = useParams();
  const { setAlert } = useAlert();

  const [reviewData, setReviewData] = useState({
    review_text: '',
    rating: 0,
  });

  const {review_text, rating} = reviewData;

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

    formData.append('review_text', review_text)
    formData.append('rating', rating)
    formData.append('book', bookId);

    try {
      const {data} = await axiosReq.post(`/api/reviews/`, formData)
      history.push(`/reviews/${data.id}`)
      setAlert('Review created successfully', 'success')
      // console.log(data)
    } catch(err) {
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
        setAlert('Failed to create review', 'error')
      }
    }
  };

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

export default ReviewCreateForm;