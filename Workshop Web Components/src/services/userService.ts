import { User } from "../types/userTypes";

export class UserService {
    apiUrl = "https://jsonplaceholder.typicode.com/users";

    createUser(body: User ) {
        fetch(this.apiUrl, {method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}, body: JSON.stringify(body)}) 
        .then(res => res.json())
        .then((data: User) => console.log(data))
        .catch(err => console.log(err));
    }

    async getAll() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
            throw err; // Re-throw the error if you want to handle it further up the chain
        }
    }

    getOne(id: number) {
        fetch(`${this.apiUrl}/${id}`)
        .then(res => res.json())
        .then((data: User) => console.log(data))
        .catch(err => console.log(err));
    }

    update(body: User) {
        fetch(`${this.apiUrl}/${body.id}`, {method: "PUT", headers: {"Content-type": "application/json; charset=UTF-8"}, body: JSON.stringify(body)}) 
        .then(res => res.json())
        .then((data: User) => console.log(data))
        .catch(err => console.log(err));
    }

    delete(userId: number) {
        fetch(`${this.apiUrl}/${userId}`, {method: "DELETE"})
        .then(res => res.json())
        .then((data: User) => console.log(data))
        .catch(err => console.log(err));
    }
}