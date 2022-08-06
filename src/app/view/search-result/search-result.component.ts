import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../../music-data.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: string = '';
  querySubscription: any;
  searchArtistSubscription: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) {}

  ngOnInit(): void {
    this.querySubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.searchQuery = params['q'];
        this.searchArtistSubscription = this.musicDataService
          .searchArtists(params['q'])
          .subscribe((result) => {
            this.results = result.artists.items.filter(
              (item) => item.images.length > 0
            );
          });
      }
    );
  }
  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
    this.searchArtistSubscription?.unsubscribe();
  }
}
