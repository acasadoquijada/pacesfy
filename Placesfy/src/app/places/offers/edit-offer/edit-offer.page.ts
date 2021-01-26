import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  form: FormGroup;
  place: Place;
  constructor(private route:ActivatedRoute, private navCrtl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")) {
        this.navCrtl.navigateBack("/places/tabs/offers");
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get("placeId"));
      this.createForm();
    })

  }

  createForm() {
    this.form = new FormGroup({
      newTitle: new FormControl(this.place.title, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(50), Validators.minLength(1)]
      }),
      newDescription: new FormControl(this.place.description,{
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180), Validators.minLength(1)]
      })
    })
  }

  onEditOffer() {
    if(!this.form.valid) {
      return;
    }
    console.log(this.form);
  }
}
