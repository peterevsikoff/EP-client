const validEmail = (value: string) => {
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regEmail.test(value);
}

const writeCookie = (param: string, value: string) => {
    const date = new Date(Date.now() + 31536000e3).toUTCString();//срок хранения cookies 1 год
    document.cookie = `${encodeURIComponent(param)}=${encodeURIComponent(value)}; expires=${date}; path=/`;
}

const getLocalDateTime = (text: string | undefined) => {
    if(text)
        return(new Date(text).toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).replace(", ", "\n"));
    else
        return("");
}


export {
    getLocalDateTime,
    validEmail,
    writeCookie,
}