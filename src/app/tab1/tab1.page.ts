import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  lat: any; 
  long: any;
  address: any;
  accuracy: any;

  constructor( private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {}
  
  ngOnInit() {
    this.geoInformation();
  }

  options = {
    timeout: 12000, 
    maximumAge: 3600,
    enableHighAccuracy: true, 
  };

  geoInformation() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.accuracy = data.coords.accuracy;

      this.cordsToAddress(this.lat, this.long);
     }).catch((error) => {
       alert(error);
     });
  }

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    maxResults: 6,
    useLocale: true
  };

  // reverse geocode
  cordsToAddress(lat, long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((response: NativeGeocoderResult[]) => {
      this.address = this.createAddress(response[0]);
    }).catch((error: any) => {
      alert(JSON.stringify(error));
    });
  }

  // Create address
  createAddress(addressObject){
    let object = [];
    let address = "";
    for (let key in addressObject) {
      object.push(addressObject[key]);
    }
    object.reverse();
    for (let val in object) {
      if(object[val].length)
      address += object[val]+', ';
    }
    return address.slice(0, -2);
  }

}
