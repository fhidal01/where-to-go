import { Component } from "@angular/core";

@Component({
  selector: "app-loading",
  styleUrls: ["./loading.component.scss"],
  template: `
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  `
})
export class LoadingComponent {}
