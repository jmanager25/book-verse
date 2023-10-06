import React, { useEffect, useState } from 'react';
import style from '../../styles/ReviewPage.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { Row } from 'react-bootstrap';
import Review from './Review';

function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState({results: [] });

  useEffect(() => {
    const handleMount = async () => {
        try {
          const [{data: review}] = await Promise.all([
            axiosReq.get(`/api/reviews/${id}`)
          ])
          setReview({results: [review]})
          console.log(review)
        }catch (err) {
         console.log(err)
        }
    }
    handleMount();
  }, [id])

  return (
    <Row>
      <Review {...review.results[0]} setReviews={setReview} />
    </Row>
  )
}

export default ReviewPage;