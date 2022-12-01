import React, { useEffect, useState } from 'react'
import { getPosts } from '../api/post'
import PostCard from './PostCard';

let pageNo = 1;
const POST_LIMIT = 2;

const getPaginationCount = (totalPostCount) => {
    return Math.ceil(totalPostCount / POST_LIMIT);
}

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [totalPostCount, setTotalPostCount] = useState(0)

    const paginationCount = getPaginationCount(totalPostCount);
    const paginationArray = new Array(paginationCount).fill(' ');

    const fetchPosts = async () => {
        const { success, postsCount, posts, message } = await getPosts(pageNo, POST_LIMIT);

        if (success) { // if success is true
            setPosts(posts);
            setTotalPostCount(postsCount);
        }
        else return console.log(message);
    }


    useEffect(() => {

        fetchPosts();
    }, [])

    return (
        <div>
            <div className="posts grid grid-cols-3 gap-3">
                {posts.map((post) => (
                    <div className="post" key={post._id}>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
            <div className="pagination flex justify-center items-center py-5 space-x-3">
                {paginationArray.map((_, index) => (
                    <button
                        className={index + 1 === pageNo ? 'px-3 py-1 bg-gray-200 text-blue-500 border-b-2 border-b-blue-500' : 'px-3 py-1 text-gray-500'}
                        key={index}
                        onClick={() => {
                            pageNo = index + 1;
                            fetchPosts();
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Home