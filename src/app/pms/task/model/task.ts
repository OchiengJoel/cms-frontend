export interface Task {

    id?: number;
    name: string;
    description: string;
    dueDate: Date;
    //status: string;// Enum type (TODO, IN_PROGRESS, COMPLETED, ON_HOLD)
    status: TaskStatus; // Enum for task status
    projectId: number
    projectName: string; // Including the project name for grouping

}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ON_HOLD = 'ON_HOLD',
}




// export interface TaskDTO {
//     id?: number;
//     name: string;
//     description: string;
//     status?: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
//     dueDate?: Date;
//     projectId: number;
//   }


// interface TaskWithProject {
//     projectId: number;
//     projectName: string;
//     taskName: string;
//     description: string;
//     dueDate: Date;
//     taskStatus: string; // Adjust based on your enum type
// }

