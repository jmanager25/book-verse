import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import styles from '../../styles/ReviewCreateEditForm.module.css'
import buttonstyles from '../../styles/Button.module.css'
import appstyles from '../../App.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import StarRating from '../../components/StarRating';

function ReviewCreateForm() {
  const [errors, setErrors] = useState({});
  const history = useHistory();

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('review_text', review_text)
    formData.append('rating', rating)

    try {
      const {data} = await axiosReq.post(`/api/books/{book_id}/reviews/`, formData)
      history.push(`/${data.id}/reviews/`)
      console.log(data)
    } catch(err) {
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
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
          <StarRating value={rating} onChange={handleChange} />
          <Button className={buttonstyles.Button} type='submit'>Submit</Button>
        </Form>
    </Container>
  )
}

export default ReviewCreateForm;