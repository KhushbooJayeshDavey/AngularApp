import { Component, OnInit, OnDestroy } from '@angular/core';

import { MusicDataService } from 'src/app/music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: any;
  newReleasesSubsciption: any;
  private formatDate(): void {
    this.releases.forEach((release: any) => {
      let month =
        release.release_date.substring(5, 7)[0] == '0'
          ? release.release_date.substring(5, 7)[1]
          : release.release_date.substring(5, 7);
      let day =
        release.release_date.substring(8, 10)[0] == '0'
          ? release.release_date.substring(8, 10)[1]
          : release.release_date.substring(8, 10);
      let year =
        release.release_date.substring(2, 4)[0] == '0'
          ? release.release_date.substring(2, 4)[1]
          : release.release_date.substring(2, 4);
      release.release_date = month + '/' + day + '/' + year;
    });
  }

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit(): void {
    this.newReleasesSubsciption = this.musicDataService
      .getNewReleases()
      .subscribe((newReleases) => {
        this.releases = newReleases.albums.items;
        this.formatDate();
      });
  }
  ngOnDestroy(): void {
    this.newReleasesSubsciption?.unsubscribe();
  }
}
