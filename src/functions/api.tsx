import axios from "axios"
import { Pagination } from "../components/interfaces/interfaces"

export const getData = async(username:string,phrase:string,language:string,pagination:Pagination) => {
    const data = await axios.get(`https://api.github.com/search/code?q=${phrase}+language:${language}+user:${username}&per_page=${pagination.perPage}&page=${pagination.page}`)
        .then(resp=>resp.data)
        .catch(err=> {return err})
    return data
}