import React from 'react';
import styles from '../../styles/Review.module.css';
import { useCurrentUser } from '../../context/currentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
  const is_owner = currentUser?.username === owner

  return (
    <Card>
        <Card.Body>
            <Media className={styles.Media}>
                <Link>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div>
                    {rating}
                </div>
                <span>{updated_at}</span>
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