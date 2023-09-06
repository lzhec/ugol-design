import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@grid/*';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationPanelModule } from './ui/navigation-panel/navigation-panel.module';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    NavigationPanelModule,
  ],
})
export class AppModule {}
