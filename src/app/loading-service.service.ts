import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {

  constructor() { }
  private loading = new BehaviorSubject<Boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  show(){
    this.loading.next(true);
  }

  hide(){
    this.loading.next(false);
  }

}
