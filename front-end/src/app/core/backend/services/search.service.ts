import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  term: string = ''

  private searchTerm = new BehaviorSubject('')
  currentTerm  = this.searchTerm.asObservable()

  updateTerms(text: string) {
    this.searchTerm.next(text)
  }
}
