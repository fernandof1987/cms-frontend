import { api } from 'boot/axios'

export async function getUser(){
    let rs = await api.get('/usuario')
    console.log(rs.data) 
    return rs.data
}

export async function createForm(){
    let rs = await api.get('/usuario/create')
    //console.log(rs.data) 
    return rs.data
}

export async function addUser(body){
    let rs = await api.post('/usuario', body)
    //console.log(rs.data) 
    return rs.data
}