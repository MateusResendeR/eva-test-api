export interface ActionInterface {
    id?: string,
    name: string,
    type: string,
    journeys: Array<string>,
}

export interface actionsRepository {
    list: () => Promise<ActionInterface[]>;
}