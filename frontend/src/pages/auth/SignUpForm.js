import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import buttonstyles from "../../styles/Button.module.css";
import appstyles from "../../App.module.css"
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import useAlert from '../../hooks/useAlert';
import { useRedirect } from '../../hooks/useRedirect';


const SignUpForm = () => {
   useRedirect("loggedIn")
   const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
   });
   const { username, password1, password2} = signUpData;
   const [errors, setErrors] = useState({});
   const history = useHistory();
   const { setAlert } = useAlert();

   const handleChange = (event) => {
    setSignUpData({
        ...signUpData,
        [event.target.name]: event.target.value,
    }) 
   };

   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('api/dj-rest-auth/registration/', signUpData);
      history.push("/signin");
      setAlert('Account created successfully', 'success')
    } catch (err) {
      setErrors(err.response?.data);
      setAlert('Account creation failed. Please try again', 'error');
    }
   };

    return (
        <Container className={styles.Container}>
            <Form className={styles.Form} onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Sign Up</h2>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    className={styles.Input} 
                    value={username} 
                    onChange={handleChange} />
                </Form.Group>
                {errors.username?.map((message, idx) =>
                    <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
                )}
                <Form.Group controlId="password1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password1" 
                    className={styles.Input} 
                    value={password1} 
                    onChange={handleChange}/>
                </Form.Group>
                {errors.password1?.map((message, idx) =>
                    <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
                )}
                <Form.Group controlId="password2">
                    <Form.Label className="d-none">Confirm Password</Form.Label>
                    <Form.Control 
                    type="Password" 
                    placeholder="Confirm Password" 
                    name="password2" 
                    className={styles.Input} 
                    value={password2} 
                    onChange={handleChange}/>
                </Form.Group>
                {errors.password2?.map((message, idx) =>
                    <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
                )}
                <div className={buttonstyles.CenterButton}>
                    <Button type="submit" className={buttonstyles.Button}>Sign Up</Button>
                </div>
                {errors.non_field_errors?.map((message, idx) =>
                    <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
                )}
                <p className={`${styles.Text} mt-3`}>Already have an account?<Link to="/signin">login here</Link></p>
            </Form>
        </Container>
    )
}

export default SignUpForm