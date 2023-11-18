import React, { useEffect, useState } from 'react';
import styles from '../../styles/ProfilesPage.module.css';
import buttonStyles from '../../styles/Button.module.css'
import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import PopularProfiles from './PopularProfiles';
import { useCurrentUser } from '../../context/currentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useProfileData, useSetProfileData } from '../../context/ProfileDataContext';
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Review from '../reviews/Review';
import BooksDisplay from '../books/BooksDisplay';


function ProfilesPage() {
    const currentUser = useCurrentUser();
    const {id} = useParams();
    const {setProfileData, handleFollow, handleUnfollow }= useSetProfileData();
    const {pageProfile} = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
    const [profileReviews, setProfileReviews] = useState([]);
    const [profileBooks, setProfileBooks] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{data: pageProfile}, reviewsResponse, booksResponse] = await Promise.all ([
                    axiosReq.get(`/api/profiles/${id}/`),
                    axiosReq.get(`/api/reviews/?owner__profile=${id}`),
                    axiosReq.get(`/api/books/?owner__profile=${id}`),
                ]);
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]},
                }));
                setProfileReviews(reviewsResponse.data)
                setProfileBooks(booksResponse.data)
            } catch (err) {
                //console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const userInfo = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
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
                        <Button className={buttonStyles.Button} onClick={() => handleUnfollow(profile)}>unfollow</Button>
                    ) : (
                        <Button className={buttonStyles.Button} onClick={() => handleFollow(profile)}>follow</Button>
                    )
                )}
                </Col>
                {profile?.biography && <Col className='p-3'>{profile.biography}</Col>}
            </Row>
        </>
    )

    const mainProfileReviews = (
        <>
            <hr/>
            <p className='text-center'>{profile?.owner}'s reviews</p>
            <hr/>
            {profileReviews.length ? (
                profileReviews.map((review) => (
                    <Review key={review.id} {...review} setReviews={setProfileReviews} />
                ))
            ) : (
                <p className='text-center'><strong>No reviews found for {profile?.owner}.</strong></p>
            )}
        </>
    )

    const mainProfileBooks = (
        <>
            <hr/>
            <p className='text-center'>{profile?.owner}'s books</p>
            <hr/>
            {profileBooks.length ? (
                <Carousel indicators={false}>
                    {profileBooks.map((book) => (
                        <Carousel.Item key={book.id}>
                            <BooksDisplay {...book} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p className='text-center'><strong>No books found for {profile?.owner}.</strong></p>
            )}
        </>
    )

    return (
        <Container className={styles.Container}>
            <PopularProfiles />
            <Row>
                {userInfo}
                {mainProfileBooks}
                {mainProfileReviews}
            </Row>
        </Container>
    )
}

export default ProfilesPage;