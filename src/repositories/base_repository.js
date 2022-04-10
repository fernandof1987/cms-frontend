import { api } from 'boot/axios'

function BaseRepository({pathName}){
    return {

        async get(page = 1, limit = 10, sortBy = 'id', descending = false, filters){
            let url = `/${pathName}?page=${page}&limit=${limit}&sortBy=${sortBy}&descending=${descending}`
            if(filters != '' && filters != undefined){
                url += `&filter=${JSON.stringify(filters)}`
            }
            let rs = await api.get(url)
            return rs.data
        },

        async createForm(){
            let rs = await api.get(`/${pathName}_create`)
            return rs.data
        },

        async add(body){
            let rs = await api.post(`/${pathName}`, body)
            return rs.data
        },

        async editForm(primaryKeyValue){
            let rs = await api.get(`/${pathName}/edit/${primaryKeyValue}`)
            return rs.data
        },

        async update(primaryKeyValue, body){
            let rs = await api.put(`/${pathName}/${primaryKeyValue}`, body)
            return rs.data
        },

        async remove(primaryKeyValue, body){
            let rs = await api.delete(`/${pathName}/${primaryKeyValue}`)
            return rs.data
        }
        
    }
}

export default BaseRepository




