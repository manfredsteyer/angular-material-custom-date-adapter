import { Flight } from '../entities/flight';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar } from "@angular/material";
import { Observable } from "rxjs";

@Component({
    selector: 'flight-alternative',
    styles: ['p { color: white; font-size:16px; }'],
    template: `
        <p>
        Alternative Flüge können gefunden werden, wenn Sie Ihre Suchkriterien geringfügig anpassen.
        </p>
    `
})
export class FlightAlternativeComponent  {
}

