const { default: clientAxios } = require("./axios")

const tokenAuth = token => {
    if(token){
        clientAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clientAxios.defaults.headers.common['x-auth-token']
    }

}

export default tokenAuth;