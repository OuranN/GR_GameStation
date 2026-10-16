import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  platformFilter = output<string>();
  searchTerm = output<string>();
  selectedPlatformFilter = signal('all');
  searchValue = signal('');

  onApplyFilter(platform: string) {
    this.platformFilter.emit(platform);
    this.selectedPlatformFilter.set(platform);
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchValue.set(inputElement.value);
    this.searchTerm.emit(inputElement.value);
  }

  clearSearch() {
    this.searchValue.set('');
    this.searchTerm.emit('');
  }
}
