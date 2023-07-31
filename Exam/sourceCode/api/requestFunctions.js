import {get, put, post, del} from "./api.js";

export async function getAllFacts() {
    return get("/data/facts?sortBy=_createdOn%20desc");
}

export async function createNewFact(data) {
    return post("/data/facts", data);
}

export async function getSingleFact(id) {
    return get("/data/facts/" + id);
}

export async function deleteFact(id) {
    return del("/data/facts/" + id);
}

export async function editFact(id, data) {
    return put("/data/facts/" + id, data);
}

export async function getNumberOfLikes(id) {
    return get(`/data/likes?where=factId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getCurrentUserLikes(factId, userId) {
    return get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function likeFact(data) {
    return post("/data/likes", data);
}