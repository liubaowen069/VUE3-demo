import { fetchGet, fetchPost, } from '../axios/index'

export function login(params) {
    return fetchPost(`/adminUser/login`,params)
}
