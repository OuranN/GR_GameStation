import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  platformFilter = output<string>();
  selectedPlatformFilter = signal('all')

  onApplyFilter(platform:string){
    this.platformFilter.emit(platform)
    this.selectedPlatformFilter.set(platform)
  }

}
