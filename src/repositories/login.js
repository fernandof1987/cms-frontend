import { api } from 'boot/axios'

export async function login(username, password, ldap = false){
    let url = `/login`
    let body = { username, password, ldap }
    let rs = await api.post( url, body )
    //console.log(rs.data) 
    return rs.data
}
