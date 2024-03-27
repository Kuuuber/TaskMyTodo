import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto/create-todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    findAll(): Promise<import("src/todo/todo.entity/todo.entity").Todo[]>;
    create(createTodoDto: CreateTodoDto): Promise<import("src/todo/todo.entity/todo.entity").Todo>;
    remove(id: string): Promise<void>;
    updateStatus(id: string, status: string): Promise<import("src/todo/todo.entity/todo.entity").Todo>;
}
