import { api } from 'boot/axios'

export async function getGroup(page = 1, limit = 10, sortBy = 'id', descending = false){
    let url = `/grupo?page=${page}&limit=${limit}&sortBy=${sortBy}&descending=${descending}`
    //console.log('url')
    //console.log(url)
    let rs = await api.get(url)
    //console.log(rs.data) 
    return rs.data
}

export async function createForm(){
    let rs = await api.get('/grupo/create')
    //console.log(rs.data) 
    return rs.data
}

export async function addGroup(body){
    let rs = await api.post('/grupo', body)
    //console.log(rs.data) 
    return rs.data
}

export async function editForm(primaryKeyValue){
    let rs = await api.get('/grupo/edit/' + primaryKeyValue)
    //console.log(rs.data) 
    return rs.data
}

export async function updateGroup(primaryKeyValue, body){
    let rs = await api.put('/grupo/' + primaryKeyValue, body)
    //console.log(rs.data) 
    return rs.data
}


export async function deleteGroup(primaryKeyValue, body){
    let rs = await api.delete('/grupo/' + primaryKeyValue)
    //console.log(rs.data) 
    return rs.data
}