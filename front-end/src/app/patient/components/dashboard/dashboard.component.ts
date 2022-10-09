import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DoctorsService } from 'src/app/core/backend/services/doctors.service';
import { SearchService } from 'src/app/core/backend/services/search.service';
import { Doctor } from 'src/app/core/interfaces/doctor';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  doctors!: Observable<Doctor[]>;
  private searchTerms = new Subject<string>();

  constructor(private doctorService: DoctorsService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.doctors = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.doctorService.searchDoctors(term)),
    );
  }

}
