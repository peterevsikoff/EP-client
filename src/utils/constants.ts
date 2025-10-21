// const port = "3001";
// const host = `http://${window.location.hostname}:${port}/`;

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const host = VITE_SERVER_URL || "https://ep-server.vercel.app/";

const addressRequest = {
    //user
    getUser: `${host}getUser`,
    getAllUsers: `${host}users/getAllUsers`,

    signUp: `${host}users/signUp`,
}

export {
    addressRequest,
}