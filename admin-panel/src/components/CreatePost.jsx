import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from "../api/post"
import { useNotification } from '../context/NotificationProvider';
import PostForm from './PostForm'

const initialPost = { title: "", thumbnail: "", featured: false, content: "", tags: "", meta: "" }

const CreatePost = () => {
    const [postInfo, setPostInfo] = useState(initialPost);
    const [busy, setBusy] = useState(false);

    const { updateNotification } = useNotification();
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setBusy(true);
        const { success, message, post, error } = await createPost(data);
        setBusy(false);
        if (success) {
            updateNotification("success", message)
            localStorage.removeItem("post");
            navigate(`/update-post/${post.slug}`)
        } else if (error) {
            updateNotification("error", error)
        } else {
            updateNotification("error", message)
        }
    }

    useEffect(() => {
        const result = localStorage.getItem("post");
        if (!result) return setPostInfo({ ...initialPost });
        const oldPost = JSON.parse(result);
        setPostInfo({ ...oldPost });
    }, [])
    return (
        <PostForm handleCreatePost={handleSubmit} initialPost={postInfo} busy={busy} postBtnTitle={"Post Blog"} resetAfteSubmit />
    )
}

export default CreatePost