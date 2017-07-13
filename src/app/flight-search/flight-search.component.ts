import { Flight } from '../entities/flight';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar, MdDialog } from "@angular/material";
import { Observable } from "rxjs";
import { FlightAlternativeComponent } from "app/flight-search/flight-alternative.component";
import { FlightWarningComponent } from "app/flight-search/flight-warning.component";

@Component({
    selector: 'flight-search',
    templateUrl: './flight-search.component.html'
})
export class FlightSearchComponent implements OnInit {

    from: string;
    to: string;
    flights: Array<Flight> = [];
    selectedFlight: Flight;

    // The following properties aren't used here
    // They just exist to demonstrate further controls,
    // like the DatePicker
    direct: boolean;
    oneWay: boolean;
    date: number = 1000 * 60 * 60 * 30;

    airports = ['Graz', 'Hamburg', 'Berlin', 'Bern'];

    airports$: Observable<string[]>;

    @ViewChild('toField') toField: any;

    constructor(
        private http: Http,
        private snackBar: MdSnackBar,
        private dialog: MdDialog
        ) {

            let d = this.dialog.open(FlightWarningComponent, {
                data: 42
            });

            d.afterClosed().subscribe(info => {
                console.debug('dialog result', info);
            });

    }

    ngOnInit() {

        this.airports$ = Observable
            .fromEvent(this.toField.nativeElement, 'input')
            .map((event: any) => event.target.value)
            .debounceTime(500)
            .switchMap(value => this.findAirports(value))
    }

    findAirports(namePrefix: string): Observable<string[]> {

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        let url = 'http://www.angular.at/api/flight';

        let headers = new Headers();
        headers.set('Accept', 'application/json');

        let search = new URLSearchParams();
        search.set('from', namePrefix);

        return this
            .http
            .get(url, { search, headers }) // Observable
            .map(resp => resp.json())
            .map(flights => flights.map(f => f.from).filter(onlyUnique));

    }

    search(): void {

        let url = 'http://www.angular.at/api/flight';

        let headers = new Headers();
        headers.set('Accept', 'application/json');


        let search = new URLSearchParams();
        search.set('from', this.from);
        search.set('to', this.to);

        this
            .http
            .get(url, { search, headers }) // Observable
            .map(resp => resp.json())
            .subscribe(
            flights => {
                this.flights = flights;

                if (this.flights.length == 0) {
                    this.dialog.open(FlightAlternativeComponent, { data: {
                        info: 42
                    } });
                }

                //this.snackBar.openFromComponent(FlightAlternativeComponent);


                let bar = this.snackBar.open(
                    `${flights.length} Flüge geladen`,
                    'OK',
                    { duration: 8000 }
                );

                bar.onAction().subscribe(_ => console.debug('click'));
            },
            err => {
                console.error('Fehler beim Laden', err);
            }
            );


        function showResponse(resp: Response) {
            console.debug('Status-Code', resp.status);
            console.debug('Status-Text', resp.statusText);
            console.debug('Content-Type', resp.headers.get('Content-Type'));
            console.debug('Alle Header-Namen', resp.headers.keys());
            console.debug('Nutzdaten als String', resp.text());
        }

        this
            .http
            .get(url, { search, headers }) // Observable
            .subscribe(
            resp => showResponse(resp),
            err => showResponse(err)
            );

    }

    select(f: Flight): void {
        this.selectedFlight = f;
    }

    remove() {
        this.selectedFlight = null;
    }


}

