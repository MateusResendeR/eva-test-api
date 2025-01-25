export interface JourneyInterface {
    id?: string,
    name: string,
    actions: Array<string>,
    collaborators: Array<string>,
    start_date: Date,
}

export interface journeysRepository {
    create: (data: JourneyInterface) => Promise<void>;
    list: () => Promise<JourneyInterface[]>;
}