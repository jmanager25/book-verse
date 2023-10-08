import React from 'react';
import styles from '../../styles/Review.module.css';
import { useCurrentUser } from '../../context/currentUserContext';
import { Card, Media } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import StarRating from '../../components/StarRating';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import useAlert from '../../hooks/useAlert';


const Review = (props) => {
  const {
    id,
    owner,
    book,
    created_at,
    updated_at,
    profile_image,
    rating,
    review_text,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const { setAlert } = useAlert();

  const handleEdit = () => {
    history.push(`/books/${book}/reviews/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      // temporary solution to delete review, does not work on deployed project bvecause the url is different
      await axiosRes.delete(`https://8080-jmanager25-bookverse-1zsn2srl0z9.ws-eu105.gitpod.io/api/reviews/${id}`);
      // Find a better solution because reloading the entire page gives poor user expirience
      window.location.reload();
      setAlert('Review deleted succesfuly', 'success')
    } catch (err) {
      console.log(err)
      setAlert('Failed to delete review', 'error')
    }
  };

  return (
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
                  {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
                </div>
            </Media>
            <Card.Text className={styles.Text}>{review_text}</Card.Text>
        </Card.Body>
        <div className='text-center'>
            <span><i className='far fa-heart' /> Like</span>
            <span><i className='far fa-comments' /> Comment</span>
        </div>
    </Card>
  )
}

export default Review;