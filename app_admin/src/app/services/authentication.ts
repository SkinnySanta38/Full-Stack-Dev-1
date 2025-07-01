import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {

  // Setup storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  // Get token from Storage provider
  // NOTE: The name of the key for the token is 'travlr-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    // Make sure a string is returned if there is no token
    if(!out){
      return '';
    }
    return out;
  }

  // Save token to Storage provider
  // NOTE: The name of the key for the token is 'travlr-token'
  public saveToken(token: string) : void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout of application and remove the JWT from Storage
  public logout() : void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if logged in and token is still valid
  // Token will need to be reauthenticated if expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Retrieve the current user. This function should only be called 
  // after the calling mehtod has checked to make sure that the user isLoggedIn
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method that leverages the login method in tripDataService
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging info
  public login(user: User, passwd: string) : void {
    this.tripDataService.login(user,passwd)
      .subscribe({
        next: (value: any) => {
          if(value) {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // Register method that uses the register method in tripsDataService
  // Because that method returns an observable, we subscribe to the
  // result and only process when the Observable condition is satisfied
  // Uncomment the two console.log messages for additional debugging info
  // NOTE: this method is identical to the login method above because 
  // the API logs a new user in immediately upon registration
  public register(user: User, passwd: string) : void {
    this.tripDataService.register(user,passwd)
      .subscribe({
        next: (value: any) => {
          if(value){
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}
