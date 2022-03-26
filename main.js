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


const getSong = async (song, artist) => {
    const token = await getAuth();
    let response = await fetch(`https://api.spotify.com/v1/search/?type=track&q=track:${song}+artist:${artist}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    console.log(response);
    let data = await response.json();
    if (response.status != 200) {
        console.log("\nSomething went wrong here.  Maybe it was you, maybe it was us. . . either way, Try Again!")
        return
    }
    console.log(data);
    return data.tracks.items[0]
}

// getSong('bang', 'ajr');
let songlist = []

let loadSong = async (song, artist) => {
    let data = await getSong(song, artist);
    if (data.preview_url == null ) {
    let lol_card = `<div class="card" style="max-width: 540px">
        <img src="/static/images/ny.jpg" class="card-img-top" alt="An artist that doesn't do spotify">
        <div class="card-body">
            <h5 class="card-song">Song?  No song. . .</h5>
            <p class="card-artist">This artist might not like spotify (just like the dude in the pic).</p>
            <p class="card-album">At any rate there's no audio so this won't be added. . . </p>
        </div>
    </div>`;
    document.getElementById('songcard').insertAdjacentHTML('afterbegin', lol_card);
    return
    }
    let new_card = `<div class="card" style="max-width: 540px">
    <img src="${data.album.images[0].url}" class="card-img-top" alt="Album cover">
    <div class="card-body">
        <h5 class="card-song">Track- ${data.name}</h5>
        <p class="card-artist">Artist- ${data.artists[0].name}</p>
        <p class="card-album">Album- ${data.album.name}</p>
    </div>
    </div>`;
    document.getElementById('songcard').insertAdjacentHTML('afterbegin', new_card);
    songlist.push({track : `${data.name}`, artist : `${data.artists[0].name}`});
    console.log(songlist)
}

let sform = document.querySelector('#sform');
sform.addEventListener('submit', (event) => {
    event.preventDefault();
    let song = event.path[0][0].value
    let artist = event.path[0][1].value
    console.log(song, artist);
    loadSong(song, artist); 
    sform.reset();
});