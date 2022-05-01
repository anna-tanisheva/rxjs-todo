import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IAddTodo, ITodoStorageItem } from './todo.storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('checkCode')
  async checkCode(
    @Body() obj: { code: string },
  ): Promise<{ result: 'ok' | 'error' }> {
    await this._sleep(2000);
    return this.appService.checkCode(obj);
  }

  @Get('todos')
  async getTodos(): Promise<ITodoStorageItem[]> {
    await this._sleep(2000);
    return this.appService.todoStore.getTodos();
  }

  @Post('add')
  async addTodo(@Body() todo: IAddTodo): Promise<ITodoStorageItem> {
    await this._sleep(2000);
    return this.appService.todoStore.addTodo(todo);
  }

  @Delete('delete/:id')
  async deleteTodo(@Param('id') id: string): Promise<void> {
    await this._sleep(2000);
    this.appService.todoStore.deleteTodo(id);
  }

  private _sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, duration));
  }
}
