import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppLayoutComponent } from './layout/app.layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          children: [
            {
              path: 'pages',
              loadChildren: () =>
                import('./pages/pages.module').then((m) => m.PagesModule),
            },
          ],
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
