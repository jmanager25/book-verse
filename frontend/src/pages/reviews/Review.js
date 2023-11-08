import React, { useState, useEffect } from 'react';
import styles from '../../styles/Review.module.css';
import { useCurrentUser } from '../../context/currentUserContext';
import { Card, Container, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import StarRating from '../../components/StarRating';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import useAlert from '../../hooks/useAlert';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from '../comments/Comment'

const Review = (props) => {
  const {
    id,
    owner,
    book,
    updated_at,
    profile_image,
    rating,
    review_text,
    comments_count,
    like_id,
    likes_count,
    setReviews,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const { setAlert } = useAlert();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [comments, setComments] = useState([]);
  

  const handleLike = async () => {
    try {
      if (!like_id) {
        const { data } = await axiosRes.post('/api/likes/', { review: id });
        setReviews((prevReviews) => {
          return prevReviews.map((prevReview) => {
            if (prevReview.id === id) {
              return {
                ...prevReview,
                like_id: data.id,
                likes_count: prevReview.likes_count + 1, 
              };
            }
            return prevReview;
          });
        });
      } else {
        await axiosRes.delete(`/api/likes/${like_id}/`);
        setReviews((prevReviews) => {
          return prevReviews.map((prevReview) => {
            if (prevReview.id === id) {
              return {
                ...prevReview,
                like_id: null,
                likes_count: prevReview.likes_count - 1, 
              };
            }
            return prevReview;
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleEdit = () => {
    history.push(`/books/${book}/reviews/${id}/edit`)
  }

  const openDeleteModal = (id) => {
    setSelectedReview(id);
    setShowDeleteModal(true); 
  };

  const handleDelete = async () => {
    if (selectedReview) {
      try {
        // temporary solution to delete review, does not work on deployed project bvecause the url is different
        await axiosRes.delete(`https://8080-jmanager25-bookverse-1zsn2srl0z9.ws-eu105.gitpod.io/api/reviews/${id}`);
        // Find a better solution because reloading the entire page gives poor user expirience
        window.location.reload()
        setAlert('Review deleted succesfuly', 'success')
      } catch (err) {
        console.log(err)
        setAlert('Failed to delete review', 'error')
      }
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const response = await axiosReq.get(`https://8080-jmanager25-bookverse-1zsn2srl0z9.ws-eu106.gitpod.io/api/comments/?review=${id}`)
        setComments(response.data);
      } catch (err) {
        console.log(err)
      }
    };
    handleMount();
  }, [id])

  return (
    <Container>
      <Card className={styles.Card}>
        <Card.Body>
            <Media className={styles.Media}>
                <Link>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div>
                    <StarRating value={rating} />
                </div>
                <div>
                  <span>{updated_at}</span>
                  {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={openDeleteModal} />}
                </div>
            </Media>
            <Card.Text className={styles.Text}>{review_text}</Card.Text>
        </Card.Body>
        <div className='text-center'>
        {currentUser ? (
          <span onClick={handleLike}>
            {like_id ? (
              <i className="fa-solid fa-heart" />
            ) : (
              <i className='far fa-heart' />
            )}
          </span>
        ) : (
          <OverlayTrigger placement="top" overlay={<Tooltip>Log in to like review</Tooltip>}>
            <i className='far fa-heart' />
          </OverlayTrigger>
        )} {likes_count}
          <span><i className='far fa-comments' />{comments_count}</span>
        </div>
        {currentUser && (
        <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          review={id}
          setReview={setSelectedReview}
          setComments={setComments}
        />
        )}
        {comments.length ? (
          comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))
        ): null} 
        <DeleteConfirmationModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleConfirm={handleDelete}
        />
    </Card>
  </Container>
  )
}

export default Review;