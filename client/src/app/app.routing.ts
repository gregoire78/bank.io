import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CompteComponent } from './compte/compte.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'compte', component: CompteComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);