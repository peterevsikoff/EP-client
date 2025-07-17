// const port = "3001";
// const host = `http://${window.location.hostname}:${port}/`;
const host = "https://ep-server.vercel.app/";

const addressRequest = {
    //user
    getUser: `${host}getUser`,
    getAllUsers: `${host}users/getAllUsers`,

    signUp: `${host}users/signUp`,
}

export {
    addressRequest,
}