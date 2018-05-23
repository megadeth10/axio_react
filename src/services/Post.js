import axios from 'axios';


export function getPost(postId) {
    return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
}

export function getComment(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}

export function getDataArray(data){
    const aaa = [];
    if((typeof data === typeof aaa) && data.length > 0){
        return Promise.all(data);
    }
}