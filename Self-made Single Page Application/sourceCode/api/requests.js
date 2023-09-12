export function getUserData() {
    const data = sessionStorage.getItem("userData");
    return JSON.parse(data);
} 

export function setUserData(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

export function removeUserData() {
    sessionStorage.clear();
}


export async function get(url) {

    let options = { method: "GET", headers: {} }

    const user = getUserData();

    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    try {
        const response = await fetch("http://localhost:3030" + url, options);

        if (response.status === 204) {
            return response;
        }

        const result = await response.json();

        if (response.ok === false) {
            throw new Error(result.message);
        }

        return result;

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export async function del(url) {
    let options = { method: "DELETE", headers: {} }

    const user = getUserData();

    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    try {
        const response = fetch("http://localhost:3030" + url, options);

        if (response.status === 204) {
            return response;
        }

        if (response.ok === false) {
            throw new Error(result.message);
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export async function post(url, data) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const user = getUserData();

    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    try {
        const response = await fetch("http://localhost:3030" + url, options);

        if (response.status === 204) {
            return response;
        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        return result;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export async function put(url, data) {
    let options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    
    const user = getUserData();

    if (user) {
        options.headers["X-Authorization"] = user.accessToken;
    }

    try {
        const response = await fetch("http://localhost:3030" + url, options);
    
        if (response.status === 204) {
            return response;
        }
    
        const result = await response.json();
    
        if (response.ok === false) {
            throw new Error(result.message);
        }
    
        return result;
    
        } catch (err) {
            alert(err.message);
            throw err;
        }
}

// Скелет на Роско-Гоблина

// async function request(method, url, data) {
//     const options =  {
//         method,
//         headers: {}
//     };

//     if (data !== undefined) {
//         options.headers["Content-Type"] = "application/json";
//         options.body = JSON.stringify(data);
//     }

//     const user = getUserData();

//     if (user) {
//         options["X-Authorization"] = user.accessToken;
//     }
    
//     try {
//     const response = await fetch("http://localhost:3030" + url, options);

//     if (response.status === 204) {
//         return response;
//     }

//     const result = await response.json();

//     if (response.ok === false) {
//         throw new Error(result.message);
//     }

//     return result;

//     } catch (err) {
//         alert(err.message);
//         throw err;
//     }
// }
