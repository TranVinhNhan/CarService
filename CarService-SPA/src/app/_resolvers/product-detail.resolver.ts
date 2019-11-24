import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AutoPart } from '../_models/autopart';
import { AutopartService } from '../_services/autopart.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductDetailResolver implements Resolve<AutoPart> {
    constructor(
        private autopartService: AutopartService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<AutoPart> {
        return this.autopartService.getPart(+route.params.id).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
