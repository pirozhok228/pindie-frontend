const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const isResponseOk = (response) => {
    return !(response instanceof Error);
};

export const getNormalizedGameDataById = async (url, id) => {
    try {
        const data = await getData(`${url}/${id}`);
        if (!isResponseOk(data)) {
            throw new Error("Ошибка получения данных")
        }
        return normalizeDataObject(data);
    }
    catch (e) {
        console.log(e.message);
    }

};


export const getNormalizedGamesDataByCategory = async (url, category) => {
    try {
        const data = await getData(`${url}?categories.name=${category}`);
        if (!isResponseOk(data)) {
            throw new Error("Ошибка получения данных")
        }
        return normalizeData(data);
    }
    catch (error) {
        console.log(error.message)
    }

};


const normalizeDataObject = (obj) => {
    let str = JSON.stringify(obj)

    str = str.replaceAll('_id', 'id');
    const newObj = JSON.parse(str)
    const result = { ...newObj, category: newObj.categories }
    return result;
};


export const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
}

export const authorize = async (url, obj) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка авторизации");
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        return error;
    }
}


export const getMe = async (url, jwt) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};


export const setJWT = (jwt) => {
    localStorage.setItem("jwt", jwt);
}

export const getJWT = () => {
    return localStorage.getItem("jwt");
}

export const removeJWT = () => {
    localStorage.removeItem("jwt");
}

export const checkIfUserVoted = (game, userId) => {
    return game.users.find((user) => user.id === userId);
};


export const vote = async (url, jwt, usersArray) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ users: usersArray }),
        })
        if (response.status !== 200) {
            throw new Error('Ошибка голосования')
        }
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}