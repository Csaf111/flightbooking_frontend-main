import { AsyncPipe, CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";


@Component({
    selector: 'user-profile',
    templateUrl: './authUser.component.html',
    standalone: true,
    imports: [AsyncPipe, CommonModule]
})

export class AuthUserComponent {
    constructor(public auth: AuthService){}
}