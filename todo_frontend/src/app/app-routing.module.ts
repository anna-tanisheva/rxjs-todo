import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TodoEditComponent } from "./todo/todo-edit/todo-edit.component";
import { TodoComponent } from "./todo/todo.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "tasks",
    loadChildren: () => import("./tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "todo",
    component: TodoComponent,
  },
  {
    path: "update/:id",
    component: TodoEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
