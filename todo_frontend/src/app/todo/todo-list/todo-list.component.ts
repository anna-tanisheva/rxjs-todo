import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ITodo } from "../todo.model";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "todo-list.component.html",
  styleUrls: ["todo-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  public todos$: Observable<ITodo[]> = this._todoService.todos$;
  public editedTodo!: ITodo;

  constructor(private _todoService: TodoService, private router: Router) {}

  onDelete(id: string) {
    this._todoService.delete(id).subscribe();
  }

  onUpdate(todo: ITodo) {
    console.log(todo);
    this._todoService.editedTodo$.next(todo);
    this.router.navigate([`/update/${todo.id}`]);
  }
}
