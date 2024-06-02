import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Station} from "@core/models/models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  gatewayUrl = 'http://localhost:4000/';

  constructor(private http: HttpClient) { }

  getStationList(): Observable<Station[]> {
    return this.http.get<Station[]>(this.gatewayUrl + 'charging-stations').pipe(
      map((res: any[]) => res.map(item => ({
        id: item.id,
        name: item.name,
        address: item.address,
        city: item.city,
        country: item.country,
        latitude: item.latitude,
        longitude: item.longitude,
        chargerList: item.chargers
      })))
    );
  }

  createChallenge(challengeData: any): Observable<any> {
    return this.http.put<any>(this.gatewayUrl + 'challenges/code', challengeData);
  }

  submitChallenge(challengeId: number, answer: string): Observable<any> {
    return this.http.post<any>(this.gatewayUrl + `challenges/code/${challengeId}`, {code: answer});
  }


  // retrieveScoreboard(){
  //   return this.http.get<LeaderBoardScore[]>(this.gatewayUrl+'scoreboard').pipe(
  //     map((res: any[]) => res.map(item => ({
  //       username: item.username,
  //       score: item.score,
  //       rank : 0
  //     })))
  //   )
  // }

}
