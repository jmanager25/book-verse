import React, { useRef, useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import styles from '../../styles/BookCreateEditForm.module.css';
import buttonstyles from '../../styles/Button.module.css';
import appstyles from "../../App.module.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';
import useAlert from '../../hooks/useAlert';
import { useRedirect } from '../../hooks/useRedirect';


function BookCreateForms() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        coverImage: '',
    });

    const {title, author, description, genre, coverImage} = bookData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { setAlert } = useAlert();

    const handleChange = (event) => {
        setBookData({
            ...bookData, 
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files.length){
            URL.revokeObjectURL(coverImage);
            setBookData({
                ...bookData,
                coverImage: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('cover_image', imageInput.current.files[0]);

        try {
          const {data} = await axiosReq.post('/api/books/', formData);
          history.push(`/books/${data.id}`)
          setAlert('Book added successfully', 'success')
        } catch(err){
          console.log(err)
          if (err.response?.status !== 401){
            setErrors(err.response?.data)
            setAlert('Failed to add a book', 'error')
          }  
        }
    }

  return (
    <Form className={styles.Form} onSubmit={handleSubmit}>
        <Form.Group controlId='title'>
            <Form.Label className={styles.FormLabel}>Title</Form.Label>
            <Form.Control 
                className={styles.FormControl}
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
            />
        </Form.Group>
        {errors?.title?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group controlId='author'>
            <Form.Label className={styles.FormLabel}>Author</Form.Label>
            <Form.Control
                className={styles.FormControl}
                type='text'
                name='author'
                value={author}
                onChange={handleChange}
            />
        </Form.Group>
        {errors?.author?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group controlId='genre'>
            <Form.Label className={styles.FormLabel}>Genre</Form.Label>
            <Form.Control
                className={styles.FormControl}
                type='text'
                name='genre'
                value={genre}
                onChange={handleChange}
            />
        </Form.Group>
        {errors?.genre?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group controlId='description'>
            <Form.Label className={styles.FormLabel}>Summary</Form.Label>
            <Form.Control
                className={styles.FormControl}
                as='textarea'
                name='description'
                value={description}
                onChange={handleChange}
            />
        </Form.Group>
        {errors?.description?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
        )}
        <Form.Group controlId="cover_image">
            <Form.Label className={styles.FormLabel}>Cover Image</Form.Label>
            <Form.File
                name="cover_image"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInput}
            />
        </Form.Group>
        {errors?.coverImage?.map((message, idx) =>
            <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
        )}
        <div className={buttonstyles.CenterButton}>
            <Button className={buttonstyles.Danger} onClick={() => history.goBack()}>
                Cancel
            </Button>
            <Button className={buttonstyles.Button} type='Submit'>
                Submit
            </Button>
        </div>
    </Form>
  )
}

export default BookCreateForms;