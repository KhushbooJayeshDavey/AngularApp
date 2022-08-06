import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  month: any;
  day: any;
  year: any;
  paramsSubscription: any;
  albumsSubcription: any;
  favoritesSubscription: any;
  loading = true;
  private formatDate(): void {
    let month =
      this.album.release_date.substring(5, 7)[0] == '0'
        ? this.album.release_date.substring(5, 7)[1]
        : this.album.release_date.substring(5, 7);
    let day =
      this.album.release_date.substring(8, 10)[0] == '0'
        ? this.album.release_date.substring(8, 10)[1]
        : this.album.release_date.substring(8, 10);
    let year =
      this.album.release_date.substring(2, 4)[0] == '0'
        ? this.album.release_date.substring(2, 4)[1]
        : this.album.release_date.substring(2, 4);
    this.album.release_date = month + '/' + day + '/' + year;
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.paramsSubscription = this.activatedRoute.params.subscribe((param) => {
      this.albumsSubcription = this.musicDataService
        .getAlbumById(param['id'])
        .subscribe((result) => {
          this.album = result;
          this.formatDate();
          this.loading = false;
        });
    });
  }
  addToFavourites(trackId: any) {
    this.favoritesSubscription = this.musicDataService
      .addToFavourites(trackId)
      .subscribe({
        next: () =>
          this.snackBar.open('Adding to Favourites...', 'Done', {
            duration: 1500,
          }),
        error: () =>
          this.snackBar.open('Unable to add song to favourites', 'Failed', {
            duration: 1500,
          }),
      });
  }
  ngOnDestroy(): void {
    this.albumsSubcription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
    this.favoritesSubscription?.unsubscribe();
  }
}
