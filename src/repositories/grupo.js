import { api } from 'boot/axios'

export async function getGroup(){
    let rs = await api.get('/grupo')
    //console.log(rs.data) 
    return rs.data
}

export async function getForm(){
    let rs = await api.get('/grupo/create')
    //console.log(rs.data) 
    return rs.data
}

export async function addGroup(body){
    let rs = await api.post('/grupo', body)
    //console.log(rs.data) 
    return rs.data
}