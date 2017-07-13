import { Flight } from '../entities/flight';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MdSnackBar, MD_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";

@Component({
    selector: 'flight-warning',
    styles: ['* { font-size:16px; font-family: arial; }'],
    template: `
        <h2 md-dialog-title>Info</h2>
        <md-dialog-content>May we track your activities to provide a better user experience?</md-dialog-content>
        <md-dialog-actions>
        <button md-button [md-dialog-close]="false">No</button>
        <button md-button [md-dialog-close]="true">Yes</button>
        </md-dialog-actions>    
    `
})
export class FlightWarningComponent  {
     constructor(@Inject(MD_DIALOG_DATA) public data: any) { 
        console.debug('MD_DIALOG_DATA', data);   
     }
}

