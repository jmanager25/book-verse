import React from 'react';
import styles from '../../styles/Profile.module.css'
import buttonStyles from '../../styles/Button.module.css'
import { useCurrentUser } from '../../context/currentUserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { Button } from 'react-bootstrap';


const Profile = (props) => {
  const { profile, imageSize = 55} = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div className='flex-column'>
      <div>
        <Link className='align-self-center' to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize}/>
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className='ml-auto'>
        {currentUser && !is_owner && (
          following_id ? (
            <Button className={buttonStyles.Button} onClick={() => {}}>unfollow</Button>
          ) : (
            <Button className={buttonStyles.Button} onClick={() => {}}>follow</Button>
          )
        )}
      </div>
    </div>
  )
}

export default Profile;