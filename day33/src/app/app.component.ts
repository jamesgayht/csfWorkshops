import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailsComponent } from './components/user-details.component';
import { UserDetail } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  users: UserDetail[] = []

  @ViewChild(UserDetailsComponent)
  userDetails!: UserDetailsComponent

  ngOnInit(): void {
    console.log(">>> in ngOnInIt <<<", this.userDetails)
  }

  ngAfterViewInit(): void {
    console.log(">>> in ngAfterInIt <<<", this.userDetails)
  }

  process(userDetail: UserDetail) {
    console.info(">>>> app-component: ", userDetail)
    this.users = [... this.users, userDetail]

    // THE METHOD BELOW IS EQUIVALENT TO 
    // this.users = [... this.users, userDetail]
    
    // this.users.push(userDetail)
    // const u: UserDetail[] = []
    // for(let n of this.users)
    //   u.push(n)
    // this.users = u
  }

  updateUser() {
    console.info("updating user")
  }
  
  deleteUser() {
    console.info("deleteing user")
  }

}
