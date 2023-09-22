import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import buttonstyles from "../../styles/Button.module.css";
import appstyles from "../../App.module.css"
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { useSetCurrentUser } from '../../context/currentUserContext';


const SignInForm = () => {
   const setCurrentUser = useSetCurrentUser();
    
   const [signInData, setSignInData] = useState({
    username: "",
    password: "",
   });
   const { username, password} = signInData;
   const [errors, setErrors] = useState({});
   const history = useHistory();

   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post("/api/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user)
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
   };

   const handleChange = (event) => {
    setSignInData({
        ...signInData,
        [event.target.name]: event.target.value,
    }) 
   };

    return (
        <Container className={styles.Container}>
            <Form className={styles.Form} onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Sign In</h2>
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
                <Form.Group controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    className={styles.Input} 
                    value={password} 
                    onChange={handleChange}/>
                </Form.Group>
                {errors.password?.map((message, idx) =>
                    <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
                )}
                <div className={buttonstyles.CenterButton}>
                    <Button type="submit" className={buttonstyles.Button}>Sign In</Button>
                </div>
                {errors.non_field_errors?.map((message, idx) =>
                    <Alert className={appstyles.Alert} variant="warning" key={idx}>{message}</Alert>
                )}
                <p className={`${styles.Text} mt-3`}>Don't have an account?<Link to="/signup">Register here</Link></p>
            </Form>
        </Container>
    )

};

export default SignInForm