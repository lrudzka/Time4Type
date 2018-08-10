
// URL of the API Football Data
let url_games = 'http://api.football-data.org/v1/competitions/';
// number of current event
let event_number = '467';

// URL of the Types API
let url_types = 'https://ubet-60936.firebaseio.com/types';

class FetchService {

    static getFootballData(callback) {
        fetch( url_games + event_number + '/fixtures', { headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8" }  } )
            .then( resp => {
                if(resp.ok){
                    return resp.json()
                }else{
                    throw new Error("Network error")
                }
            }).then(obj => {
            if (typeof callback == 'function') {
                callback(obj);
            }
        }).catch( err => console.log(err) );
    }

    static getFootballEventName(callback) {
        fetch( url_games + event_number, { headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8" }  } )
            .then(results=>{
                return results.json();
            }).then(obj => {
            if (typeof callback == 'function') {
                callback(obj);
            }
        });
    }

    static getTypesData(callback) {
        fetch(url_types+'.json')
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(obj => {
            if (typeof callback == 'function') {
                callback(obj);
            }
        }).catch(err => console.log(err))
    }

    static sendTypesData(data) {
        fetch(url_types + '.json', { method: 'POST', body: JSON.stringify(data) } )
            .then( resp => {
                if(resp.ok){
                    return resp.json()
                }else{
                    throw new Error("Network error")
                }
            }).then(data => {
            console.log(data)
        }).catch( err => console.log(err) );
    }

    static updateClosedTypesData(key, points) {
        fetch(url_types + "/" + key + '.json',
            {
                method: 'PATCH', body: JSON.stringify({
                    points: points,
                    status: 'closed'
                })
            })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
            console.log(data)
        }).catch(err => console.log(err));
    }

    static updateInPlayTypesData(key) {
        fetch(url_types + "/" + key + '.json',
            {
                method: 'PATCH', body: JSON.stringify({
                    status: 'in_play'
                })
            })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
            console.log(data)
        }).catch(err => console.log(err));

    }

    static deleteTypesData(key, callback) {
        fetch(url_types +'/'+key+'.json', {method: 'delete'})
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(obj => {
            if (typeof callback == 'function') {
                callback(obj);
            }
        }).catch(err => console.log(err));
    }

}

module.exports = FetchService;