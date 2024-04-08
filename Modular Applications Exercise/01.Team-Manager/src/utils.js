export function authenticationToken() {
    const token = localStorage.getItem("authToken");

    return token ? token : null;
}

