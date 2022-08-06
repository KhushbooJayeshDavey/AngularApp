/*********************************************************************************

* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source (including web sites) or distributed to other students. 
* Name: Khushboo Jayesh Davey   Student ID: 157478199   Date: 05-08-2022

********************************************************************************/

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  searchString: string = '';
  title = 'web422-a4';
  token: any;
  constructor(private router: Router, private authService: AuthService) {}
  handleSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // only read the token on "NavigationStart"
        this.token = this.authService.readToken();
      }
    });
  }
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
