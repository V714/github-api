
export interface Pagination {
    perPage: number,
    page: number
}

export interface TableDataTypes {
    
    total_count: number,
    items?: {
        name:string,
        html_url:string,
        repository: {description:string, owner: {avatar_url:string, login:string}}
        }[]
}



export interface listElement {
    index: number,
    filename: string,
    fileUrl: string,
    description: string,
    username: string,
    avatar: string
}