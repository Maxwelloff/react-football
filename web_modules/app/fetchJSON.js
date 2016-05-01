const catchError= (exception) =>{
    return {error:exception}
}

const data = {
    headers : { 'X-Auth-Token': 'b713ef6e43cc4571892dd4a65f48e2fd' }
}

export default (url) => fetch(url, data).then((res) => {

    // for both http ok/not ok, we try to parse as JSON
    // or reject if json parsing failed
    // http OK

    if (res.status >= 200 && res.status < 300) {
        return new Promise((resolve, reject) => res.json().then(
            (data) => resolve(data),
            catchError,
        ))
    }

    // http not ok
    return new Promise((resolve, reject) => res.json().then(catchError))

}, catchError)
