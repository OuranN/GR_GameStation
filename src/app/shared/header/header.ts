import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../services/whatsapp/whatsapp';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HEADER {
  whatsappService = inject(WhatsappService)

  redirectToWhatsapp(){
    this.whatsappService.redirectToWhatsapp()
  }
}
