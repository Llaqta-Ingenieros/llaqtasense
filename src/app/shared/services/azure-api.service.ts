import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AzureApiService {
  constructor(private http: HttpClient) { }

  getResourceGroups(): Observable<any> {
    return this.http.get('https://management.azure.com/subscriptions/.../resourcegroups');
  }
}
