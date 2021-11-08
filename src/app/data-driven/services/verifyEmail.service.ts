import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailService {

  constructor(private http: HttpClient) { }

    verifyEmail(email: string) {
        return this.http.get('assets/data/email.json')
            .pipe(
                delay(3000),
                map((data: any) => data.emails),
                tap(console.log),
                map((data: { email: string} []) => data.filter(v => v.email === email)),
                tap(console.log),
                map((data: any[]) => data.length > 0),
                tap(console.log)
            );
    }

}