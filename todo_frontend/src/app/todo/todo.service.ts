import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, tap } from "rxjs";
import { ITodo, ITodoRequest, ITodoUpdateRequest } from "./todo.model";

export interface ITodoStorageItem {
  id: string;
  text: string;
  isDone: boolean;
  createdOn: string;
  selected: boolean;
}

@Injectable({ providedIn: "root" })
export class TodoService {
  private _todos$: BehaviorSubject<ITodoStorageItem[]> = new BehaviorSubject<ITodoStorageItem[]>([]);
  public editedTodo$: BehaviorSubject<ITodo | null> = new BehaviorSubject<ITodo | null>(null);
  readonly todos$: Observable<ITodo[]> = this._todos$.asObservable();

  constructor(private http: HttpClient) {}

  create(todo: ITodoRequest): Observable<void> {
    return this.http.post<ITodoStorageItem>("http://localhost:3000/add", todo).pipe(switchMap(() => this.getAllTodos()));
  }

  getAllTodos(): Observable<void> {
    return this.http.get<ITodoStorageItem[]>("http://localhost:3000/todos").pipe(
      tap((todos) => this._todos$.next(todos)),
      map(() => void 0)
    );
  }

  update(todo: ITodoUpdateRequest): Observable<void> {
    console.log(todo);
    return this.http.post<ITodoStorageItem>("http://localhost:3000/update", todo).pipe(switchMap(() => this.getAllTodos()));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ITodoStorageItem>(`http://localhost:3000/delete/${id}`).pipe(switchMap(() => this.getAllTodos()));
  }
}
