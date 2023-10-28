import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";


function CommentCreateForm(props) {
  const { review, setComments, profileImage, profile_id, } = props;
  const [content, setContent] = useState("");
  const { setAlert } = useAlert();

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/api/comments/", {
        content,
        review,
      });
      // the comments state is not being updated, fix it later
      setComments((prevComments) => [...prevComments, data]);
      
      setContent("");
      setAlert('Comment created successfully', 'success');
      // Find a solution to update the state of the review in order for new reviews to be displayed without reloading the page
      window.location.reload()
      
    } catch (err) {
      console.log(err);
      setAlert('Failed to create comment', 'error');
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;