import React, { useEffect, useState } from 'react'
import styles from '../../styles/Book.module.css';
import {Form, Container, Row, Card} from "react-bootstrap";
import { axiosReq } from '../../api/axiosDefaults';
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import useAlert from '../../hooks/useAlert';
import PopularProfiles from '../profiles/PopularProfiles';


const Book = ({ message, filter = "" }) => {
    const [books, setBooks] = useState([]);
    const history = useHistory();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const { setAlert } = useAlert();
    const [query, setQuery] = useState("");
    const {pathname} = useLocation();

    const handleEdit = (id) => {
        history.push(`/books/${id}/edit`)
    };

    const openDeleteModal = (id) => {
        setSelectedBookId(id);
        setShowDeleteModal(true); 
    };

    const handleDelete = async () => {
        if (selectedBookId) {
            try {
                await axiosReq.delete(`/api/books/${selectedBookId}/`);
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBookId));
                history.push("/");
                setAlert('Book deleted successfully', 'success')
            } catch (err) {
                //console.log(err);
                setAlert('Failed to delete book', 'error')
            }
            setShowDeleteModal(false);
        }
    };
        
    useEffect(() => {
        const handleMount = async () => {
            try {
                const response = await axiosReq.get(`/api/books/?search=${query}&${filter}`)
                setBooks(response.data);
            }catch(err) {
                //console.log(err)
            }
        };

        const timer = setTimeout(() => {
            handleMount();;
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [query, filter, pathname])

    return (
        <Container className={styles.Container}>
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
            </Form>
            <PopularProfiles />
            <Row xs={1} md={3} lg={4}>
                {books.map((book) => (
                    <div key={book.id} className={styles.BookContainer}>
                        <Card className={styles.Card}>
                            <Link to={`books/${book.id}`} className={styles.Link}>
                                <Card.Img variant='top' src={book.cover_image} alt={book.title} className={styles.CardImage} />
                            </Link>
                        </Card>
                        <div className={styles.Title}>{book.title}</div>
                        <div className={styles.Author}> by {book.author}</div>
                        <div className={styles.CardBody}>
                            {book.is_owner && (
                                <>
                                    <div className={styles.Icons}>
                                        <i onClick={() => handleEdit(book.id)} className="fas fa-edit"></i>
                                        <i onClick={() => openDeleteModal(book.id)} className="fas fa-trash"></i>
                                    </div>
                                </>
                                )}
                        </div>
                    </div>
                ))}
            </Row>
            <DeleteConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleConfirm={handleDelete}
            />
        </Container>
    )
}

export default Book;