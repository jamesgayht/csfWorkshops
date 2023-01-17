export interface Task {
    task: string; 
    priority: string; 
    dueDate: Date; 
}

export interface Todo {
    name: string; 
    email: string; 
    tasks: Task[];
}