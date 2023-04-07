const axios = require('axios');

exports.getdata = async function getdata(id = undefined){
    let url, res ; 

    if (id === undefined){
        url = 'https://xkcd.com/info.0.json'
    } else{
        url = `https://xkcd.com/${id}info.0.json`
    }

    const config ={
        method: 'get',
        url : url
    }

    res = await axios(config)
    console.log(res.status)
    console.log(res.data)



    if (res.status == 200 && res.headers['content-length']){
        return res.data
    } else {
        return undefined
    }

}