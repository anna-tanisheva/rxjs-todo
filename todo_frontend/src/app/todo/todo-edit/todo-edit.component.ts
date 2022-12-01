import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { ITodo } from "../todo.model";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { TodoService } from "../todo.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-todo",
  templateUrl: "todo-edit.component.html",
  styleUrls: ["todo-edit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoEditComponent implements OnChanges, OnDestroy, OnInit {
  private readonly _destroy$$ = new Subject<void>();
  private readonly _store$$: BehaviorSubject<ITodo | null> = new BehaviorSubject<ITodo | null>(null);

  public readonly formGroup = new FormGroup({
    text: new FormControl(""),
    isDone: new FormControl(false),
  });

  @Input() todo: ITodo | null = null;
  @Output() updatedTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  constructor(private todoService: TodoService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.todo == null) {
      return;
    }
    this._store$$.next(changes.todo.currentValue);
  }

  ngOnInit(): void {
    this._onFormGroupChanges();
    this._onStoreChanges();
    this._store$$.subscribe(console.log);
    this.todoService.editedTodo$.subscribe((val) => {
      this._store$$.next(val);
      this.todo = val;
    });

    // setTimeout(() => {
    //   this._store$$.next({ ...this._store$$.getValue()!, text: 'zhopa' });
    // }, 5000);
  }

  ngOnDestroy(): void {
    this._destroy$$.next();
    this._destroy$$.complete();
  }

  private _onFormGroupChanges(): void {
    // стрелка от формы в стор
    this.formGroup.controls.text?.valueChanges.pipe(takeUntil(this._destroy$$)).subscribe((text: string) => {
      const oldValue = this._store$$.getValue();
      if (oldValue == null) {
        return;
      }
      const newValue: ITodo = { ...oldValue, text: text };
      this._store$$.next(newValue);
    });
  }

  private _onStoreChanges(): void {
    // стрелка от стора к форме
    this._store$$.pipe(takeUntil(this._destroy$$)).subscribe((store) => {
      if (store == null) {
        this.formGroup.reset({ text: "", isDone: false }, { emitEvent: false, onlySelf: true });
        return;
      }
      this.formGroup.patchValue({ text: store.text }, { emitEvent: false, onlySelf: true });
    });
  }

  update(todo: ITodo): void {
    this.updatedTodo.emit(todo);
    this.todoService.update({ id: todo.id, isDone: todo.isDone, text: this.formGroup.controls.text?.value }).subscribe(() => {
      this.router.navigate(["/todo"]);
    });
  }
}
