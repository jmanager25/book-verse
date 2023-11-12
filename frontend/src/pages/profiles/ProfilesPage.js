import React, { useEffect } from 'react';
import styles from '../../styles/ProfilesPage.module.css';
import buttonStyles from '../../styles/Button.module.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import PopularProfiles from './PopularProfiles';
import { useCurrentUser } from '../../context/currentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../context/ProfileDataContext';

function ProfilesPage() {
    const currentUser = useCurrentUser();
    const {id} = useParams();
    const setProfileData = useSetProfileData();
    const {pageProfile} = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{data: pageProfile}] = await Promise.all ([
                    axiosReq.get(`/api/profiles/${id}/`),
                ]);
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]},
                }));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const userInfo = (
        <>
            <Row className='px-3 text-center'>
                <Col lg={3} className='text-lg-left'>
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.image} />
                </Col>
                <Col lg={6}>
                    <h3 className='m-2'>{profile?.owner}</h3>
                    <Row className='justify-content-center'>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.books_count}</div>
                            <div>Books</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.reviews_count}</div>
                            <div>Reviews</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.followers_count}</div>
                            <div>Followers</div>
                        </Col>
                        <Col xs={3} className='my-2'>
                            <div>{profile?.following_count}</div>
                            <div>Following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className='text-lg-right mt-2'>
                {currentUser && !is_owner && (
                    profile?.following_id  ? (
                        <Button className={buttonStyles.Button} onClick={() => {}}>unfollow</Button>
                    ) : (
                        <Button className={buttonStyles.Button} onClick={() => {}}>follow</Button>
                    )
                )}
                </Col>
                {profile?.biography && <Col className='p-3'>{profile.biography}</Col>}
            </Row>
        </>
    )

    return (
        <Container className={styles.Container}>
            <PopularProfiles />
            <Row>
                {userInfo}
            </Row>
            <Row></Row>
            <Row></Row>
        </Container>
    )
}

export default ProfilesPage;