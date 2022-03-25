import { api } from 'boot/axios'

export async function login(username, password){
    let url = `/login`
    let body = { username, password }
    let rs = await api.post(url, body )
    //console.log(rs.data) 
    return rs.data
}
