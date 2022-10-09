import { Component, OnInit, Input, Output } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { SearchService } from 'src/app/core/backend/services/search.service';


@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit {

  terms: string = ''

  constructor(
    private searchService: NbSearchService,
    private search: SearchService
    ) { 

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.search.updateTerms(data.term)
        this.terms = data.term
        //console.log(this.terms)
      })
  }

  ngOnInit(): void {
    this.search.currentTerm.subscribe((msg: any) => this.terms = msg)
    //console.log(this.terms)
  }

}
