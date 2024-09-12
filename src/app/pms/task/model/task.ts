export interface Task {

    id?: number;
    name: string;
    description: string;
    dueDate: Date;
    status: string;// Enum type (TODO, IN_PROGRESS, COMPLETED, ON_HOLD)
    projectId: number
}
