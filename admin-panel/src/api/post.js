import client from './client';


export const getPosts = async (pageNo, limit) => {
    try {
        const { data } = await client.get(`/post/get-posts?pageNo=${pageNo}&limit=${limit}`);
        return data;
    } catch (error) {
        if (error?.response) {
            return error.response.data;
        }
        return { success: false, message: error.message || error };
    }
}