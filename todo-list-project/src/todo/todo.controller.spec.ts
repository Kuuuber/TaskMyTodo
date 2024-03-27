import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoController = module.get<TodoController>(TodoController);
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = [{ id: 1, title: 'Test todo', status: 'pending' }];
      jest.spyOn(todoService, 'findAll').mockImplementation(async () => result);

      expect(await todoController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const todoDto = { title: 'New todo', status: 'pending' };
      const result = { id: 1, ...todoDto };
      jest.spyOn(todoService, 'create').mockImplementation(async () => result);

      expect(await todoController.create(todoDto)).toBe(result);
    });
  });
  

  describe('updateStatus', () => {
    it('should update todo status', async () => {
      const result = { id: 1, title: 'Test todo', status: 'in_progress' };
      jest.spyOn(todoService, 'updateStatus').mockImplementation(async () => result);

      expect(await todoController.updateStatus('1', 'in_progress')).toBe(result);
    });
  });
});
