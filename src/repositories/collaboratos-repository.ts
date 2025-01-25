export interface collaboratorInterface {
    id?: string,
    name: string,
    journeys: Array<string>,
}

export interface collaboratorsRepository {
    list: () => Promise<collaboratorInterface[]>;
}