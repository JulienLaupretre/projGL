import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';

import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  users$?: Observable<User[]>;

  private searchTerms = new Subject<string>();

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.userService.getUsersFromServer(); //Fetch user to modify later the list
    
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers().pipe(

        map(users => users.filter(user => user != null))
        )
      
      
      .pipe(
        map(users => users.filter(user => user.email.includes(term)))
      )),
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

}
