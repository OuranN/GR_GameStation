import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WhatsappService } from '../../../services/whatsapp/whatsapp';

@Component({
  selector: 'app-whatsapp-config',
  imports: [ReactiveFormsModule],
  templateUrl: './whatsapp-config.html',
  styleUrl: './whatsapp-config.css',
})
export class WhatsappConfig implements OnInit {

  whatsappService = inject(WhatsappService);
  successMessage = signal(false);
  whatsappNumber = signal('');
  form = new FormGroup({
    whatsappNumber: new FormControl(this.whatsappNumber(),{
      validators: [Validators.pattern(/^\d{11}$/)]
    })
  })

  async onSubmit(){
    await this.whatsappService.saveWhatsappNumber(this.form.controls.whatsappNumber.value!)
    
    this.successMessage.set(true);

    setTimeout(() => {
      this.successMessage.set(false);
    }, 2000);

  }

  async ngOnInit() {
    this.whatsappNumber.set(await this.whatsappService.getWhatsappNumber());
    this.form.controls.whatsappNumber.setValue(this.whatsappNumber())
  }
}
