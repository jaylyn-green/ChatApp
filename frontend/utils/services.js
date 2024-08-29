export const baseURL = 'http://localhost:5151/api';

export const postReq = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body,
    });

    const data = await response.json();
    //checks for error or if there is any data
    if (!response.ok) {
        let message

        if (data?.message) {
            message = data.message;
        }
        else {
            message = data;
        }
        return {
            error: true,
            message
        }
    }

    return data;
}