export class Todo {
    private id: number;
    [key: string]: any;

    constructor(public task: string, public done: boolean = false) {
        this.id = Date.now() + Math.floor(Math.random() * (9 - 0));
        this.task = task;
        this.done = done;
    }

    getProperty(prop: string) {
        return this[prop];
    }
    
    getID() {
        return this.id;
    }
}