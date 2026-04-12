async function api(path, options = {}){
    const res = await fetch(path,{
        headers: {
            // I am not using content-type in my backend have question that I need to ask my teacher
            "accept": "application/json",
            "content-type": "application/json"
        },
        ...options
    });

    const data = await res.json().catch(() => null);
    if(!res.ok){
        const msg = data?.error || `Request failed (${res.status})`;
        throw new Error(msg);
    };
    return data;
};

export {api};