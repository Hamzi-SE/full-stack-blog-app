import React, { useEffect } from 'react'
import { getPosts } from '../api/post'

let pageNo = 1;
const POST_LIMIT = 9;
const Home = () => {

    const fetchPosts = async () => {
        const { success, posts, message } = await getPosts(pageNo, POST_LIMIT);

        if (success) { // if success is true
            console.log(posts);
        }
        else { // if success is false
            return console.log(message);
        }
    }


    useEffect(() => {

        fetchPosts();
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home