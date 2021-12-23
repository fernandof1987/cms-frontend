import { api } from 'boot/axios'

const pathName = 'produto'

export async function get(page = 1, limit = 10, sortBy = 'id', descending = false){
    let url = `/${pathName}?page=${page}&limit=${limit}&sortBy=${sortBy}&descending=${descending}`
    //console.log('url')
    //console.log(url)
    let rs = await api.get(url)
    //console.log(rs.data) 
    return rs.data
}

export async function createForm(){
    let rs = await api.get(`/${pathName}/create`)
    //console.log(rs.data) 
    return rs.data
}

export async function add(body){
    let rs = await api.post(`/${pathName}`, body)
    //console.log(rs.data) 
    return rs.data
}

export async function editForm(primaryKeyValue){
    let rs = await api.get(`/${pathName}/edit/${primaryKeyValue}`)
    //console.log(rs.data) 
    return rs.data
}

export async function update(primaryKeyValue, body){
    let rs = await api.put(`/${pathName}/${primaryKeyValue}`, body)
    //console.log(rs.data) 
    return rs.data
}


export async function remove(primaryKeyValue, body){
    let rs = await api.delete(`/${pathName}/${primaryKeyValue}`)
    //console.log(rs.data) 
    return rs.data
}
