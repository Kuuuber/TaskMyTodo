import { Repository } from 'typeorm';
import { Todo } from './todo.entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto/create-todo.dto';
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<Todo>);
    findAll(): Promise<Todo[]>;
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, status: string): Promise<Todo>;
}
