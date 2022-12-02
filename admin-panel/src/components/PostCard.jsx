import React from 'react'
import dateFormat from 'dateformat';
const { BsPencilSquare, BsTrash } = require('react-icons/bs');
const { Link } = require('react-router-dom');

const PostCard = ({ post, onDeleteClick }) => {

    if (!post) return null;
    const { title, thumbnail, tags, meta, createdAt, slug } = post;

    return (
        <div>
            <div className="post-card bg-white shadow-sm rounded flex flex-col">
                <div className="post-card-image">
                    <img className='aspect-video' src={thumbnail ? thumbnail.url : "https://via.placeholder.com/800x600"} alt={title} />
                </div>
                <div className="post-card-content p-2 flex flex-col flex-1 justify-between">
                    <h3 className="post-card-title text-lg font-semibold text-gray-700">{title}</h3>
                    <div className="post-card-meta">
                        <p className="text-gray-500">{meta.length > 80 ? meta.substring(0, 80) + "..." : meta}</p>
                    </div>
                    <div className="flex justify-between py-2">
                        <p className="text-gray-500 text-sm">{dateFormat(createdAt, "mediumDate")}</p>
                        <p className="post-card-tags text-gray-500 text-sm">{tags.join(', ')}</p>
                    </div>

                    <div className="flex space-x-3">
                        <Link to={`/update-post/${slug}`} className='w-8 h-8 rounded-full bg-blue-400  flex justify-center items-center text-white hover:bg-blue-600'><BsPencilSquare /></Link>
                        <button
                            className='w-8 h-8 rounded-full bg-red-400 flex justify-center items-center text-white hover:bg-red-600'
                            onClick={onDeleteClick}
                        ><BsTrash /></button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default PostCard