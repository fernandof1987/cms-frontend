import { api } from 'boot/axios'

export async function getToken(groupId, reportId){
    let url = `/powerbi_embedded`
    //let body = JSON.stringify( {groupId, reportId} )
    let body = {groupId, reportId}
    let rs = await api.post(url, body )
    //console.log(rs.data) 
    return rs.data
}
