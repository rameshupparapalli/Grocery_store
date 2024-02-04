import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';




import { RoutegaurdGuard } from './auth-guard.guard';




describe('RouteGuardGuard', () => {

  let guard: RoutegaurdGuard;




  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [RouterTestingModule],

      providers: [RoutegaurdGuard]

    });

    guard = TestBed.inject(RoutegaurdGuard);

  });




  it('should be created', () => {

    expect(guard).toBeTruthy();

  });




  it('should allow navigation when canActivate returns true', () => {

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

   

    const canActivate = guard.canActivate(route, state);

   

    expect(canActivate).toBe(true);

  });




  it('should prevent navigation when canActivate returns false', () => {

    // You can modify this test case to simulate a scenario where canActivate returns false.

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

   

    const canActivate = guard.canActivate(route, state);

   

    expect(canActivate).toBe(false);

  });

});