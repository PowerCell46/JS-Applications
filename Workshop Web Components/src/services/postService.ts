import { Post } from "../types/postTypes";

export class PostService {
    apiUrl = "https://jsonplaceholder.typicode.com/posts";

    createPost(body: Post ) {
        fetch(this.apiUrl, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, body: JSON.stringify(body)}) 
        .then(res => res.json())
        .then((data: Post) => console.log(data))
        .catch(err => console.log(err));
    }

    getAll() {
        fetch(this.apiUrl)
        .then(res => res.json())
        .then((data: Post[]) => console.log(data))
        .catch(err => console.log(err));
    }

    getOne(id: number) {
        fetch(`${this.apiUrl}/${id}`)
        .then(res => res.json())
        .then((data: Post) => console.log(data))
        .catch(err => console.log(err));
    }

    update(body: Post) {
        fetch(`${this.apiUrl}/${body.id}`, {method: "PUT", headers: {"Content-type": "application/json; charset=UTF-8"}, body: JSON.stringify(body)}) 
        .then(res => res.json())
        .then((data: Post) => console.log(data))
        .catch(err => console.log(err));
    }

    delete(id: number) {
        fetch(`${this.apiUrl}/${id}`, {method: "DELETE"})
        .then(res => res.json())
        .then((data: Post) => console.log(data))
        .catch(err => console.log(err));
    }
}