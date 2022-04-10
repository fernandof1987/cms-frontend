import { api } from 'boot/axios'

import BaseRepository from './base_repository'
const repository = BaseRepository({pathName: 'menu'})
repository.menuTree = async () => {
    let rs = await api.get(`/menu_tree`)
    return rs.data
}
export default repository