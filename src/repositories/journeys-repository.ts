export interface JourneyInterface {
    id?: string,
    name: string,
    actions: Array<string>,
    collaborators: Array<string>,
    start_date: Date,
    status?: string,
}

export interface journeysRepository {
    create: (data: JourneyInterface) => Promise<string>;
    list: () => Promise<JourneyInterface[]>;
}