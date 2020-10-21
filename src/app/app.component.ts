import { Component, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Maps';

  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;

  ngOnInit() {
    this.initMap();
  }

  initMap():void
  {
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      center: new google.maps.LatLng(22.451307, 88.304394),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl:true
    });

    this.infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent("You are here");
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
      },
      () => {
        this.handleLocationError(true, this.infoWindow, this.map.getCenter());
      }
    );
  } else {
    this.handleLocationError(false, this.infoWindow, this.map.getCenter());
  }


    this.map.addListener('click', (event) => {
      if (this.infoWindow) this.infoWindow.close();
      this.infoWindow = new google.maps.InfoWindow({ position: event.latLng });
      this.infoWindow.setContent(`LAT: ${event.latLng.lat()}\nLON:${event.latLng.lng()}`);
      this.infoWindow.open(this.map);
      console.log(event.latLng.toJSON());
    });



  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }
}
