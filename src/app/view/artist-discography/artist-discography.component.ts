import { AnimateTimings } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from 'src/app/music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  artist: any;
  artistIdSubscription: any;
  artistSubscription: any;
  albumsByArtistSubscription: any;
  loadingArtist = true;
  loadingAlbums = true;
  private formateDate(): void {
    this.albums.forEach((album: any) => {
      let month =
        album.release_date.substring(5, 7)[0] == '0'
          ? album.release_date.substring(5, 7)[1]
          : album.release_date.substring(5, 7);
      let day =
        album.release_date.substring(8, 10)[0] == '0'
          ? album.release_date.substring(8, 10)[1]
          : album.release_date.substring(8, 10);
      let year =
        album.release_date.substring(2, 4)[0] == '0'
          ? album.release_date.substring(2, 4)[1]
          : album.release_date.substring(2, 4);
      album.release_date = month + '/' + day + '/' + year;
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.loadingAlbums = true;
    this.loadingArtist = true;
    this.artistIdSubscription = this.activatedRoute.params.subscribe(
      (param) => {
        this.artistSubscription = this.musicDataService
          .getArtistById(param['id'])
          .subscribe((result) => {
            this.artist = result;
            this.loadingArtist = false;
          });
        this.albumsByArtistSubscription = this.musicDataService
          .getAlbumsByArtistId(param['id'])
          .subscribe((result) => {
            this.albums = result.items.filter(
              (curValue, index, self) =>
                self.findIndex(
                  (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
                ) === index
            );
            this.formateDate();
            this.loadingAlbums = false;
          });
      }
    );
  }
  ngOnDestroy(): void {
    this.artistIdSubscription?.unsubscribe();
    this.artistSubscription?.unsubscribe();
    this.albumsByArtistSubscription?.unsubscribe();
  }
}
