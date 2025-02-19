import express from 'express';
import { Todo } from './models/Todo.mjs';

const app = express(), PORT = 3000, todos: Todo[] = [
    new Todo('Buy milk'),
    new Todo('Buy bread', true),
    new Todo('Buy cheese')
];

app.get('/', (req, res) => {
    const { q, sort } = req.query, s: string[] = [];

    if (q) {
        s.push(`q=${q}`);
    }

    if (sort) {
        s.push(`sort=${sort}`);
    }

    res.status(200).send(`Hello World!\nQuery string = ${s.join('&')}`);
});

app.get('/todos', (req, res) => {
    const { sort, prop } = req.query;

    try {
        if (sort) {
            const p = prop?.toString(), getFormatedProperty = (todo: Todo) => {
                if (!p) {
                    return todo.getID();
                }

                const property = todo.getProperty(p);

                return typeof property === 'string' ? property.toLowerCase() : property;
            };

            todos.sort((t1, t2) => {
                const propOfT1 = getFormatedProperty(t1), propOfT2 = getFormatedProperty(t2);

                if ((p && !new Todo('').hasProperty(p)) || propOfT1 === undefined || propOfT2 === undefined) {
                    throw new Error(`Invalid property &lt${p}&gt. Property not found. Valid Properties of a Todo Object are:
                        <ul>
                        ${Object.keys(new Todo('')).map(key => `<li>${key}</li>`).join('')}
                        </ul>`, { cause: 404 });
                }

                switch (sort) {
                    case 'asc':
                        return propOfT1 < propOfT2 ? -1 : propOfT1 > propOfT2 ? 1 : 0;
                    case 'desc':
                        return propOfT1 > propOfT2 ? -1 : propOfT1 < propOfT2 ? 1 : 0;
                    default:
                        throw new Error(`Invalid sort value &lt${sort}&gt. Valid values are <ul><li>asc</li><li>desc</li></ul>`, { cause: 400 });
                }
            });
        }

        res.status(200).json(todos);
    } catch (error) {
        const msg = `Error: ${error instanceof Error ? error.message : error}`;

        error instanceof Error ? res.status(typeof error.cause === 'number' ? error.cause : 400).send(msg) : res.status(500).send(msg);
    }
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    try {
        if (isNaN(id)) {
            throw new Error(`id &lt${req.params.id}&gt is not a number` , { cause: 404 });
        }

        const todo = todos.find(todo => todo.getID() === id);

        todo ? res.status(200).json(todo) : (() => { throw new Error(`id ${id} not found`, { cause: 404 }) })();
    } catch (error) {
        const msg = `Error: ${error instanceof Error ? error.message : error}`;

        error instanceof Error ? res.status(typeof error.cause === 'number' ? error.cause : 400).send(msg) : res.status(500).send(msg);
    }
});

app.listen(PORT, (error) => {
    console.log(`Server is running on port ${PORT}`);

    if (error) {
        console.log(`Error: ${error}`);
    }
});