import React from 'react'
import { ImSpinner11, ImEye, ImFilePicture, ImFilesEmpty } from 'react-icons/im'

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
    return (
        <form className='p-2 flex'>
            <div className="w-9/12 h-screen space-y-3 flex flex-col">
                {/* Title and Submit */}
                <div className="flex items-center justify-between">
                    <h1 className='text-xl font-semibold text-gray-700'>Create New Post</h1>

                    <div className="flex items-center space-x-5">
                        <button className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition'><ImSpinner11 /> <span>Reset</span></button>
                        <button className='flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500 hover:text-white hover:bg-blue-500 transition'><ImEye /> <span>View</span></button>
                        <button className='h-10 w-36 px-5 hover:ring-1 bg-blue-500 rounded text-white hover:text-blue-500 hover:bg-transparent ring-blue-500 transition'>Post</button>
                    </div>
                </div>
                {/* Featured Checkbox */}
                <div className="flex items-center space-x-2 mt-5">
                    <input type="checkbox" name="featured" id="featured" />
                    <label htmlFor="featured" className='text-gray-700 cursor-pointer group'><span className='group-hover:text-blue-500'>Featured</span></label>
                </div>

                {/* Title */}
                <input type="text" placeholder='Post Title' name="title" id="title" className='text-xl font-semibold w-full h-10 px-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500' />
                {/* Image Input */}
                <div className='flex space-x-2'>
                    <div>
                        <input type="file" name="image" id="image-input" hidden />
                        <label htmlFor='image-input' className='flex items-center space-x-2 px-3 ring-1 ring-gray-700 rounded h-10 text-gray-700 hover:text-white hover:bg-gray-700 transition cursor-pointer'><span>Place Image</span> <ImFilePicture /> </label>
                    </div>
                    <div className="flex flex-1 justify-between rounded bg-gray-400">
                        <input type="text" value="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" disabled className='bg-transparent px-2 w-full text-white' />
                        <button className='text-xs flex flex-col items-center justify-center p-1 w-16 rounded self-stretch bg-gray-500 hover:bg-gray-700 text-white'><ImFilesEmpty /> <span>Copy</span></button>
                    </div>
                </div>
                {/* Content */}
                <textarea placeholder='## Markdown' name="content" id="content" cols="30" rows="10" className='flex-1 w-full p-2 h-96 border-2 font-mono tracking-wide text-lg border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none'></textarea>
                {/* Tags Input */}
                <div>
                    <label htmlFor="tags" className='text-gray-700'>Tags</label>
                    <input type="text" placeholder='Tags' name="tags" id="tags" className='w-full h-10 px-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500' />
                </div>
                {/* Meta Description Input */}
                <div>
                    <label htmlFor="meta" className='text-gray-700'>Meta Description</label>
                    <textarea placeholder='Meta Description' name="meta" id="meta" cols="30" rows="3" className='w-full p-2 h-28 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none'></textarea>
                </div>
            </div>

            <div className="w-1/4 px-2 relative">
                <h2 className='text-xl font-semibold text-gray-700 mb-2'>Thumbnail</h2>
                <div>
                    <input type="file" name="thumbnail" id="thumbnail-input" hidden />
                    <label htmlFor='thumbnail-input' className='border border-dashed border-gray-500 aspect-video text-gray-500 flex flex-col justify-center items-center cursor-pointer'>
                        <span>Select Thumbnail</span>
                        <span className='text-xs'>Recommended size</span>
                        <span className='text-xs'>1280 * 720</span>
                    </label>
                </div>

                <div className="bg-white absolute top-1/2 -translate-y-1/2 px-2 py-4 rounded">
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