
export class LoginError extends Error {
    constructor() {
        super('User does not exists');
    }
}