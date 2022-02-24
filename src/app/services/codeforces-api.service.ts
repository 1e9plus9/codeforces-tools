import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Contest} from "../../contest";

@Injectable({
  providedIn: 'root'
})
export class CodeforcesApiService {
  private BASE_URL = 'https://codeforces.com/api/';
  httpOptions = {
    headers: new HttpHeaders({

    })
  };
  constructor(private http: HttpClient) {}
  getContests(): Observable<any> {
    const url = this.BASE_URL + 'contest.list?gym=false/';
    return this.http.get(url, this.httpOptions);
  }
  getUserContests(handle: string): Observable<any> {
    const url = this.BASE_URL + 'user.status?handle=' + handle;
    return this.http.get(url, this.httpOptions);
  }
  getUserInfo(handle: string): Observable<any> {
    const url = this.BASE_URL + 'user.info?handles=' + handle;
    return this.http.get(url, this.httpOptions);
  }

}
