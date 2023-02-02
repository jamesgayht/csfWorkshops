export interface Game {
    name: string,
    gid: number, 
    ranking: number
}

export class Game {
    constructor (
        public name: string, 
        public gid: number, 
        public ranking: number
    ) {}
}

export interface GameResult {
    offset: number, 
    limit: number, 
    total: number,
    timestamp: number, 
    games: Game[]
}
