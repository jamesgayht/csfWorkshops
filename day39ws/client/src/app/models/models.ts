export interface Character {
    id: number 
    name: string
    description: string
    image: string
    details: string
}

export interface Search {
    name: string
    limit: 20
    offset: 0
}

export interface Comment {
    id: number 
    comment: string
}

export interface PostResponse {
    postId: string
}