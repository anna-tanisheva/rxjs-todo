import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ITodoRequest } from "../todo.model";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo-add",
  templateUrl: "todo-add.component.html",
  styleUrls: ["todo-add.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent implements OnInit {
  toDoForm!: FormGroup;
  @ViewChild("todoForm") todoForm!: ElementRef;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.toDoForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      checkbox: new FormControl(false, [Validators.required]),
    });
  }

  submit(): void {
    const formData: ITodoRequest = {
      text: this.toDoForm.get("text")?.value,
      isDone: this.toDoForm.get("checkbox")?.value,
    };
    this.todoService.create(formData).subscribe();
    this.todoForm.nativeElement[0].value = "";
    this.todoForm.nativeElement[1].checked = false;
    this.todoForm.nativeElement[1].value = false;
  }

  getAllTodos(): void {
    this.todoService.getAllTodos().subscribe();
  }
}
