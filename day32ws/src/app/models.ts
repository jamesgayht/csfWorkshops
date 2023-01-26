export interface Task {
    description: string
    priority: string
    due: Date
}

export interface Todo {
    tasks: Task[]
}