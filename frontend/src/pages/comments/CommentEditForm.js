import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";
import useAlert from "../../hooks/useAlert";

function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments, reviewId } = props;

    const [formContent, setFormContent] = useState(content);
    const { setAlert } = useAlert();

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/api/comments/${id}/`, {
                content: formContent.trim(),
                review: reviewId,
            });

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.map((comment) =>
                    comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment
                ),
            }));
        
            setShowEditForm(false);
            setAlert("Comment updated successfully", "success");
        } catch (err) {
            console.log(err);
            setAlert("Failed to update comment", "error");
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    cancel
                </button>
                <button
                    className={styles.Button}
                    disabled={!content.trim()}
                    type="submit"
                >
                    save
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;