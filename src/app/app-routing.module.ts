import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthGuard } from './core/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          canLoad: [AuthGuard],
          canActivate: [AuthGuard],
          component: AppLayoutComponent,
          children: [
            {
              path: 'pages',
              loadChildren: () =>
                import('./pages/pages.module').then((m) => m.PagesModule),
            },
          ],
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
        },
        { path: 'pages/notfound', component: NotfoundComponent },
        { path: '**', redirectTo: 'pages/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
