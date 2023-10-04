import React, { useEffect, useRef, useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import styles from '../../styles/BookCreateEditForm.module.css';
import buttonstyles from '../../styles/Button.module.css';
import appstyles from "../../App.module.css"
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axiosReq } from '../../api/axiosDefaults';


function BookEditForm() {
    const [errors, setErrors] = useState({});

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        summary: '',
        genre: '',
        coverImage: '',
    });

    const {title, author, summary, genre, coverImage} = bookData;

    const imageInput = useRef(null);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
               const {data} = await axiosReq.get(`/api/books/${id}/`);
               console.log(data);
               const {title, author, summary, genre, coverImage, is_owner} = data;

               is_owner ? setBookData({title, author, summary, genre, coverImage}) : history.push('/');
            } catch(err){
              console.log(err)
            }
        };
        handleMount();
    }, [history, id])
       
    
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
        formData.append('summary', summary);
        formData.append('genre', genre);

        if (imageInput?.current?.files[0]) {
            formData.append('cover_image', imageInput.current.files[0]);
        }

        try {
          await axiosReq.put(`/api/books/${id}`, formData);
          history.push(`/books/${id}`)
        } catch(err){
          console.log(err)
          if (err.response?.status !== 401){
            setErrors(err.response?.data)
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
        <Form.Group controlId='summary'>
            <Form.Label className={styles.FormLabel}>Summary</Form.Label>
            <Form.Control
                className={styles.FormControl}
                as='textarea'
                name='summary'
                rows={6}
                value={summary}
                onChange={handleChange}
            />
        </Form.Group>
        {errors?.summary?.map((message, idx) =>
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
                Save
            </Button>
        </div>
    </Form>
  )
}

export default BookEditForm;