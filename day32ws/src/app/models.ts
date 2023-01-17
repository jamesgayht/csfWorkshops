export interface TaskItem {
    task: string;
    priority: string; 
    dueDate: Date; 
}

export interface Tasks {
    name: string; 
    email: string; 
    taskItem: TaskItem[];
}