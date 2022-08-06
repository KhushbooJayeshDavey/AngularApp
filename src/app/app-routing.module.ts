import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './view/about/about.component';
import { AlbumComponent } from './view/album/album.component';
import { ArtistDiscographyComponent } from './view/artist-discography/artist-discography.component';
import { NewReleasesComponent } from './view/new-releases/new-releases.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { SearchResultComponent } from './view/search-result/search-result.component';
import { FavouritesComponent } from './view/favourites/favourites.component';
import { RegisterComponent } from './view/register/register.component';
import { LoginComponent } from './view/login/login.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/newReleases', pathMatch: 'full' },
  {
    path: 'newReleases',
    component: NewReleasesComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'artist/:id',
    component: ArtistDiscographyComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
    canActivate: [GuardAuthService],
  },
  { path: 'search', component: SearchResultComponent },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [GuardAuthService],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
