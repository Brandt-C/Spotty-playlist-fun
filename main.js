const getAuth = async () => {
    
    const response = await fetch('https://accounts.spotify.com/api/token',
        {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });
    const token = await response.json();
    console.log(token);
    return token.access_token
}


const getSong = async (songname, artist) => {
    const token = await getAuth();
    let response = await fetch(`https://api.spotify.com/v1/search/?type=track&q=track:${songname}+artist:${artist}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    console.log(response);
    let data = await response.json();
    console.log(data.tracks.items[0]);
    return data.tracks.items[0]
}

getSong('bang', 'ajr');

