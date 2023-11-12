import React, { useEffect, useState } from 'react';
import appStyles from '../../App.module.css';
import { Container } from 'react-bootstrap';
import { useCurrentUser } from '../../context/currentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import Profile from './Profile';

const PopularProfiles = () => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: []},
        popularProfiles: { results: []},
    });
    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(
                    "/api/profiles/?ordering=reviews_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: {results: data},
                }));
            } catch (err) {
              console.log(err);
            }
        };
        handleMount();
    }, [currentUser]);

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