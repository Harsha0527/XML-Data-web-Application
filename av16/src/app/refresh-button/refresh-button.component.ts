import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent {
  @Output() refresh = new EventEmitter<void>();

  onRefresh() {
    this.refresh.emit();
  }

}
