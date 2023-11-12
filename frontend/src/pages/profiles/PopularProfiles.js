import React from 'react';
import appStyles from '../../App.module.css';
import { Container } from 'react-bootstrap';
import Profile from './Profile';
import { useProfileData } from '../../context/ProfileDataContext';

const PopularProfiles = () => {
    const { popularProfiles } = useProfileData();

  return (
    <Container className={appStyles.Content}>
        <p>Most followed profiles</p>
        <div className='d-flex justify-content-around'>
            {popularProfiles.results.slice(0,4).map((profile) => (
                <Profile key={profile.id} profile={profile} />
            ))} 
        </div>   
    </Container>
  )
}

export default PopularProfiles;