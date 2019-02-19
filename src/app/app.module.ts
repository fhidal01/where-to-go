// angular
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatNativeDateModule } from "@angular/material";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// 3rd Party
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FirebaseUIModule } from "firebaseui-angular";
import { firebase, firebaseui } from "firebaseui-angular";

// app-components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { SecureImageComponent } from "./secure-image/secure-image.component";
import { LoadingComponent } from "./loading/loading.component";

// app-services
import { AuthGuardService } from "./guards/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { LocationService } from "./services/location.service";
import { PlacesService } from "./services/places.service";

// app-modules
import { AppRoutingModule } from "./app-routing.module";
import { AppMaterialModule } from "./app-material.module";

import { environment } from "../environments/environment";
import { HeaderInterceptor } from "./interceptors/HeaderInterceptor";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ["public_profile", "email", "user_likes", "user_friends"],
      customParameters: {
        auth_type: "reauthenticate"
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: "<your-tos-link>",
  privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SecureImageComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase, environment.name),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [
    AuthService,
    LocationService,
    PlacesService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
