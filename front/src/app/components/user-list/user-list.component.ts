import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() currentUsername: string = '';
  @Input() currentUserRole: string = '';
  otherUsers: any[] = [];
  filteredUsers: any[] = [];
  userlistSubscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userlistSubscription = this.userService.getUsers().subscribe(users => {
      this.otherUsers = users;
      this.filterUsers();
    });

    this.refreshUsers();
  }

  ngOnDestroy(): void {
    this.userlistSubscription?.unsubscribe();
  }

  refreshUsers(): void {
    this.userService.refreshUsers();
  }

  filterUsers(): void {
    this.filteredUsers = this.otherUsers.filter(user => user.name !== this.currentUsername);

    if (this.currentUserRole === 'CLIENT') {
      this.filteredUsers = this.filteredUsers.filter(user => user.role === 'SUPPORT');
    } else if (this.currentUserRole === 'SUPPORT') {
      this.filteredUsers = this.filteredUsers.filter(user => user.role === 'CLIENT');
    }
  }
}
