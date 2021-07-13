import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  outputData = 'Processed Natural Language text will come here.';

  exampleForm = new FormGroup({
    input: new FormControl(),
  });

  // tslint:disable-next-line:typedef
  formSubmit() {
    console.log(this.exampleForm.controls.input.value);
    this.outputData = 'Loading...';

    setTimeout(() => {
        (async () => {
          // server 'http://131.234.29.133:8082'
          let baseUrl = 'http://localhost:8080/getOntology';
          const value = this.exampleForm.controls.input.value;
          if (value != null) {
            baseUrl = baseUrl + '?path=' + value;
          }
          // const url = new URL(baseUrl + 'getOntology?path=' + value);
          const response = await fetch(baseUrl.toString());
          // tslint:disable-next-line:triple-equals
          if (response.status != 200) {
            this.outputData = 'Bad Request Error. \n' + response.body;
          } else {
            this.outputData = await response.json();
          }
        })();
      },
      2000);
  }
}
