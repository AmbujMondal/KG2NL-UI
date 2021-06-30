import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  outputData = '';

  exampleForm = new FormGroup({
    input: new FormControl(),
  });

  // tslint:disable-next-line:typedef
  formSubmit() {
    console.log(this.exampleForm.controls.input.value);
    this.outputData = 'Loading...';

    setTimeout(() => {
        (async () => {
          // server 'http://131.234.29.133:8081/'//http://localhost:8080/
          let baseUrl = 'http://131.234.29.133:8082/getOntology';
          const value = this.exampleForm.controls.input.value;
          if (value != null) {
            baseUrl = baseUrl + '?path=' + value;
          }
          // const url = new URL(baseUrl + 'getOntology?path=' + value);
          const response = await fetch(baseUrl.toString());
          const data = await response.json();
          // tslint:disable-next-line:triple-equals
          if (response.status != 200) {
            this.outputData = JSON.stringify(data);
          } else {
            this.outputData = JSON.stringify(data, undefined, 4);
            // this.outputData = data.toString();
          }
        })();
      },
      2000);
  }
}
