import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FlightSearchComponent } from "./flight-search/flight-search.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdDialogModule, MdAutocompleteModule, MdNativeDateModule, MdDatepickerModule, MdSnackBarModule, MdTooltipModule, MdChipsModule, MdSidenavModule, MdIconModule, MdListModule, MdCheckboxModule, MdCardModule, MdButtonModule, MdToolbarModule, MdInputModule, DateAdapter } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightAlternativeComponent } from "app/flight-search/flight-alternative.component";
import { FlightWarningComponent } from "app/flight-search/flight-warning.component";
import { CustomDateAdapter } from "app/shared/custom-date-adapter";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdAutocompleteModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdDialogModule,
    MdSnackBarModule, MdTooltipModule, MdChipsModule, MdSidenavModule, MdIconModule, MdListModule, MdCheckboxModule, MdCardModule, MdButtonModule, MdToolbarModule, MdInputModule
  ],
  declarations: [
    AppComponent,
    FlightSearchComponent,
    FlightAlternativeComponent,
    FlightWarningComponent
  ],
  entryComponents: [FlightAlternativeComponent, FlightWarningComponent],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
