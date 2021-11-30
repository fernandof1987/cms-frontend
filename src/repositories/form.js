import { api } from 'boot/axios'
//import { api } from '../boot/axios'
export async function getForm(){
    let rs = await api.get('/usuario/create')
    //console.log(rs.data) 
    //return rs.data.response
    return rs.data
}

