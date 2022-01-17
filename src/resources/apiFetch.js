import axios from "axios";
import config from "./config";

const get = async url => {
    try {
        const res = await fetch(`${url}`)

        const resJson = await res.json();
        return resJson;
    } catch (error) {
        console.error('apiFetch get error', error);
    }
}

const post = async (url, body) => {
    const a = await axios({
        method: "POST",
        url: url,
        data: body,
        headers: { "Content-Type": "application/json"  }
    })
    .then( res => {
      return res;
    } )
    .catch( err => { 
        return {
          status: 401,
          message: err.response.data.message
        };
    } )
    return a;
};

export default {
    get,
    post
}