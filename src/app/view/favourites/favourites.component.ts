import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  getFavouritesSubscription: any;
  removeFavouritesSubscription: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.getFavouritesSubscription = this.musicDataService
      .getFavourites()
      .subscribe((result) => {
        this.favourites = result.tracks;
      });
  }
  removeFromFavourites(id: any): void {
    this.removeFavouritesSubscription = this.musicDataService
      .removeFromFavourites(id)
      .subscribe((result) => {
        this.favourites = result.tracks;
      });
  }
  ngOnDestroy(): void {
    this.getFavouritesSubscription?.unsubscribe();
    this.removeFavouritesSubscription?.unsubscribe();
  }
}
