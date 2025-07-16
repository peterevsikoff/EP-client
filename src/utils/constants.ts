// const port = "3001";
// const host = `http://${window.location.hostname}:${port}/`;
const host = "https://serverep.vercel.app/";

const addressRequest = {
    //user
    getUser: `${host}getUser`,
    getAllUsers: `${host}users/getAllUsers`,
}

export {
    addressRequest,
}