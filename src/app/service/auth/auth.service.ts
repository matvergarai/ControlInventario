import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,throwError } from "rxjs";
import { catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiURL = 'http://localhost:4200/';  // Cambia esto por la URL real de tu API
  
    constructor(private http: HttpClient) {}
  
    login(username: string, password: string): Observable<any> {
      return this.http.post<any>(this.apiURL,{username, password})
        .pipe(
          catchError(error => {
            return throwError(error);
          })
        );
    }
  }