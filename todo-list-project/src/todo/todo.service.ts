
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.status = createTodoDto.status;
    return this.todoRepository.save(todo);
  }

  remove(id: number): Promise<void> {
    return this.todoRepository.delete(id).then(() => null);
  }

  async updateStatus(id: number, status: string): Promise<Todo> {
    const todo = await this.todoRepository.find({ where: { id } });
    if (!todo || todo.length === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    const todoToUpdate = todo[0];
    todoToUpdate.status = status;
    return this.todoRepository.save(todoToUpdate);
  }

}
