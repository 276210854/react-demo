import { GETDETAIL, GETLIST } from './fetchUrl'
import axios from './fetch'


export const getDetailByIdXHR = (value) => {
    return axios({
        method: 'post',
        url: GETDETAIL,
        data: {
            id: value
        }
    })
}

export const getListXHR = () => {
    return axios({
        method: 'get',
        url: GETLIST
    })
}



