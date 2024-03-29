const https = require('https');
const querystring = require('querystring');
const { base64encode } = require('nodejs-base64');
const config = require('../resources/config.json');
const msgUtil = require('./messageUtils');

module.exports = {
    token: '',
    renewToken: () => {
        console.log('getting token');
        let data = querystring.stringify({'grant_type': 'client_credentials'});
        let options = {
            host: 'accounts.spotify.com',
            path: '/api/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${base64encode(config.spotify.client_id + ':' + config.spotify.client_secret)}`
            }
        }
    
        let post_req = https.request(options, function(res) {
            var result = '';
    
            res.on('data', chunk => {
                result += chunk.toString();
            });
    
            res.on('end', () => {
                try {
                    module.exports.token = JSON.parse(result)['access_token'];
                } catch(error) {
                    msgUtil.log('Ran into error getting token... trying again in 10 seconds...');
                    setInterval(module.exports.renewToken, 10000);
                }
            });
        });
    
        post_req.write(data);
        post_req.end();
    },
    set_playlist: (message, server, args) => {
        //https://api.spotify.com/v1/playlists/{id}?fields=tracks(items(track(name)))

        let options = {
            host: 'api.spotify.com',
            path: `/v1/${args[0] + 's'}/${args[1]}?fields=name,tracks(items(track(name,artists)))`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${module.exports.token}`
            }
        }

        let get_request = https.get(options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk.toString();
            });

            res.on('end', () => {
                let jdata = JSON.parse(data);
                server.playlist = {};
                server.playlist.name = jdata.name;
                server.playlist.tracks = [];

                if(args[0] == 'album') {
                    for(let track of jdata.tracks.items) {
                        let by = 'by ';
                        track.artists.forEach(artist => { by += artist.name + ' '; });

                        server['playlist']['tracks'].push({
                            name: track.name + ' lyrics ' + by,
                            id: null
                        });
                    }
                } else {
                    for(let track of jdata.tracks.items) {
                        let by = 'by ';
                        track.track.artists.forEach(artist => { by += artist.name + ' '; });

                        server['playlist']['tracks'].push({
                            name: track.track.name + ' ' + by,
                            id: null
                        });
                    }
                }

                msgUtil.send(message.channel, `**Playlist set to '${server.playlist.name}' with ${server.playlist.tracks.length} songs added to it!**`);
            });
        });

        get_request.end();
    },
    getTrack: (id, callback) => {
        let options = {
            host: 'api.spotify.com',
            path: `/v1/tracks/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${module.exports.token}`
            }
        }
        
        https.get(options, res => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk.toString();
            });

            res.on('end', () => {
                let jdata = JSON.parse(data);
                let artists = [];

                jdata.artists.forEach(artist => artists.push(artist.name));

                callback(jdata.name + 'lyrics by ' + artists.join(', '));
            });
        }).end();
    }
}