import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Task03Service } from "./task03.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-task03",
  templateUrl: "./task03.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task03Service],
})
export class Task03Component {
  public numbers$$: Observable<number[]> = this.store.randomNumbers$$;
  public countOfNumbers$$: Observable<number> = this.store.countOfNumbers$$;
  public minOfAllNumbers$$: Observable<number> = this.store.minOfAllnumbers$$;
  public maxOfAllNumbers$$: Observable<number> = this.store.maxOfAllNumbers$$;
  public averageNumber$$: Observable<number> = this.store.averageNumber$$;
  public isRandomNumberDisabled$$: Observable<boolean> = this.store.isRandomNumberDisabled$$;

  constructor(private store: Task03Service) {}

  onClick(): void {
    this.store.addRandomNumber$().subscribe();
  }
}
