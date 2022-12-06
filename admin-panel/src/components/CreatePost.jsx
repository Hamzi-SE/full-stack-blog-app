import React, { useState } from 'react'
import { ImSpinner11, ImEye, ImFilePicture, ImFilesEmpty, ImSpinner3 } from 'react-icons/im'
import { uploadImage } from '../api/post';

const mdRules = [
    { title: "From h1 to h6", rule: "# Heading -> ###### Heading", key: "mdRule1" },
    { title: "Blockquote", rule: "> Your Quote", key: "mdRule2" },
    { title: "Image", rule: "![alt text](https://image_url.com)", key: "mdRule3" },
    { title: "Link", rule: "[Link Text](https://link_url.com)", key: "mdRule4" },
    { title: "Bold", rule: "**Bold Text**", key: "mdRule5" },
    { title: "Italic", rule: "*Italic Text*", key: "mdRule6" },
    { title: "Strikethrough", rule: "~~Strikethrough Text~~", key: "mdRule7" }
];

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", thumbnail: "", featured: false, content: "", tags: "", meta: "" });
    const [selectedThumbnailURL, setSelectedThumbnailURL] = useState('')
    const [imageUrlToCopy, setImageUrlToCopy] = useState('');
    const [imageUploading, setImageUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "thumbnail") {
            const file = e.target.files[0];
            if (!file.type?.includes("image")) {
                alert("Please select an image file");
                return;
            }
            setPost({ ...post, thumbnail: file });
            return setSelectedThumbnailURL(URL.createObjectURL(file));
        }

        if (name === "featured") {
            return setPost({ ...post, featured: e.target.checked });
        }

        if (name === "tags") {
            const tags = value.split(",");
            if (tags.length > 4) {
                console.log("Only first 4 tags will be saved");
                return setPost({ ...post, tags: tags.slice(0, 4) });
            }
            return setPost({ ...post, tags });
        }

        if (name === "meta" && value.length > 150) {
            return setPost({ ...post, meta: value.substring(0, 150) });
        }

        setPost({ ...post, [name]: value });
    }

    const handleImageUpload = async (e) => {
        if (imageUploading) return;
        setImageUrlToCopy('');
        const file = e.target.files[0];
        if (!file.type?.includes("image")) {
            alert("Please select an image file");
            return;
        }
        setImageUploading(true);
        const formData = new FormData();
        formData.append("image", file); // image is the key in the backend api route
        const { success, message, image } = await uploadImage(formData);
        if (!success) return alert(message);
        setImageUploading(false);
        setImageUrlToCopy(image);
    }

    const handleOnCopy = () => {
        const textToCopy = `![Add image description](${imageUrlToCopy})`;
        navigator.clipboard.writeText(textToCopy);
    }

    return (
        <form className='p-2 flex'>
            <div className="w-9/12 h-screen space-y-3 flex flex-col">
                {/* Title and Submit */}
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-semibold text-gray-700'>Create New Post</h1>

                    <div className="flex items-center space-x-5">
                        <button type="button" className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition'><ImSpinner11 /> <span>Reset</span></button>
                        <button type="button" className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition'><ImEye /> <span>View</span></button>
                        <button className='h-10 w-36 px-5 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition'>Post</button>
                    </div>
                </div>
                {/* Featured Checkbox */}
                <div className="flex items-center space-x-2 mt-5">
                    <input type="checkbox" name="featured" onChange={handleChange} id="featured" />
                    <label htmlFor="featured" className='select-none text-gray-700 cursor-pointer group'><span className='group-hover:text-blue-500'>Featured</span></label>
                </div>

                {/* Title */}
                <input type="text" value={post.title} onChange={handleChange} placeholder='Post Title' name="title" id="title" className='text-xl font-semibold w-full h-10 px-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500' />
                {/* Image Input */}
                <div className='flex space-x-2'>
                    <div>
                        <input type="file" onChange={handleImageUpload} name="image" id="image-input" hidden />
                        <label htmlFor='image-input' className='flex items-center space-x-2 px-3 ring-1 ring-gray-700 rounded h-10 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer'><span>Place Image</span> {!imageUploading ? <ImFilePicture /> : <ImSpinner3 className='animate-spin' />} </label>
                    </div>
                    {imageUrlToCopy && <div className="flex flex-1 justify-between rounded bg-gray-400">
                        <input type="text" value={imageUrlToCopy} disabled className='bg-transparent px-2 w-full text-white' />
                        <button type='button' onClick={handleOnCopy} className='text-xs flex flex-col items-center justify-center p-1 w-16 rounded self-stretch bg-gray-500 hover:bg-gray-700 text-white'><ImFilesEmpty /> <span>Copy</span></button>
                    </div>}
                </div>
                {/* Content */}
                <textarea value={post.content} onChange={handleChange} placeholder='## Markdown' name="content" id="content" cols="30" rows="10" className='flex-1 w-full p-2 h-96 border-2 font-mono tracking-wide text-lg border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none'></textarea>
                {/* Tags Input */}
                <div>
                    <label htmlFor="tags" className='text-gray-700'>Tags</label>
                    <input type="text" value={post.tags} onChange={handleChange} placeholder='Add tags with comma. React, Javascript' name="tags" id="tags" className='w-full h-10 px-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500' />
                </div>
                {/* Meta Description Input */}
                <div>
                    <label htmlFor="meta" className='text-gray-700'>Meta Description {post.meta.length}/150</label>
                    <textarea value={post.meta} onChange={handleChange} placeholder='Meta Description' name="meta" id="meta" cols="30" rows="3" className='w-full p-2 h-28 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none'></textarea>
                </div>
            </div>

            <div className="w-1/4 px-2 relative">
                {/* Thumbnail */}
                <h2 className='text-xl font-semibold text-gray-700 mb-2'>Thumbnail</h2>
                <div>
                    <input type="file" onChange={handleChange} name="thumbnail" id="thumbnail-input" hidden />
                    <label className='cursor-pointer' htmlFor='thumbnail-input' >
                        {selectedThumbnailURL ? <img src={selectedThumbnailURL} alt="thumbnail" className="aspect-video shadow-sm rounded" /> : <div className='border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center cursor-pointer'>
                            <span>Select Thumbnail</span>
                            <span className='text-xs'>Recommended size</span>
                            <span className='text-xs'>1280 * 720</span>
                        </div>}
                    </label>
                </div>

                {/* Markdown Rules */}
                <div className="bg-white absolute top-1/2 -translate-y-1/3 px-2 py-4 rounded mt-10">
                    <h2 className='font-semibold text-center'>General Markdown Rules</h2>
                    <ul className='space-y-2'>
                        {mdRules.map(rule => (
                            <li key={rule.key}>
                                <p className='font-semibold text-gray-500'>{rule.title}</p>
                                <p className='font-semibold text-gray-700 pl-2 font-mono'>{rule.rule}</p>
                            </li>
                        ))}
                        <li className='text-center text-blue-500'>
                            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer" className='text-blue-500 hover:text-blue-700'>Find out more</a>
                        </li>
                    </ul>


                </div>
            </div>
        </form>
    )
}

export default CreatePost