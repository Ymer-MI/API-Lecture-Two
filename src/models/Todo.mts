export class Todo {
    private id: number;

    constructor(public task: string, public done: boolean = false) {
        this.id = Date.now() + Math.floor(Math.random() * (9 - 0));
        this.task = task;
        this.done = done;
    }

    getProperty(prop: string) {
        switch (prop.toLowerCase()) {
            case 'id':
                return this.id;
            case 'task':
                return this.task;
            case 'done':
                return this.done;
            default:
                return undefined;
        }
    }
    
    getID() {
        return this.getProperty('id');
    }

    hasProperty(prop: string) {
        return this.getProperty(prop) !== undefined;
    }
}