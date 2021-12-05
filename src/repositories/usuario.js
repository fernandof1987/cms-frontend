import { api } from 'boot/axios'

export async function addUser(body){
    let rs = await api.post('/usuario', body)
    console.log(rs.data) 
    return rs.data
}

