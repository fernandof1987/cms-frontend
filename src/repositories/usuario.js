import { api } from 'boot/axios'

export async function getUser(){
    let rs = await api.get('/usuario')
    //console.log(rs.data) 
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

export async function editForm(primaryKeyValue){
    let rs = await api.get('/usuario/edit/' + primaryKeyValue)
    //console.log(rs.data) 
    return rs.data
}

export async function updateUser(primaryKeyValue, body){
    let rs = await api.put('/usuario/' + primaryKeyValue, body)
    //console.log(rs.data) 
    return rs.data
}


export async function deleteUser(primaryKeyValue, body){
    let rs = await api.delete('/usuario/' + primaryKeyValue)
    //console.log(rs.data) 
    return rs.data
}