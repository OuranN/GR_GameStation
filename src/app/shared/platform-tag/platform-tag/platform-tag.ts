import { Component, input } from '@angular/core';

@Component({
  selector: 'app-platform-tag',
  imports: [],
  templateUrl: './platform-tag.html',
  styleUrl: './platform-tag.css',
})
export class PlatformTag {
  platformTag = input.required<string>()
}
