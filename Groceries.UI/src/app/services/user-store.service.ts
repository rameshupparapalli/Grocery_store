import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");
  private id$=new BehaviorSubject<number>(0);
  constructor() { }

  public getRoleFromStore()
  {
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string)
  {
    this.role$.next(role);
  }

  public getFullNameFromStore()
  {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullname:string)
  {
    this.fullName$.next(fullname)
  }

  public getIdFromStore()
  {
    return this.id$.asObservable();
  }
  // public getIdFromStore(): Observable<number> {
  //   return this.id$.pipe(filter((id) => id !== 0));
  // }
  
  public setIdFromStore(userid:number)
  {
    this.id$.next(userid);
  }

  
}
