import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requiredFileType, maxSizeFile } from './upload-file-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  imgExtensions: any[] = ['.jpeg', '.png', '.jpg', '.svg'];
  pdfExtensions: any[] = ['.pdf'];
  textExtensions: any[] = ['.plain'];
  xmlExtensions: any[] = ['.xml'];
  xlsxExtensions: any[] = ['.xlsx', '.xls', '.csv'];

  form: any = this.fb.group({
    name: ['', Validators.required],
    img_file: ['', [Validators.required, requiredFileType(this.imgExtensions)]],
    pdf_file: ['', [Validators.required, requiredFileType(this.pdfExtensions), maxSizeFile(5242880)]],
    xml_file: ['', requiredFileType(this.xmlExtensions)],
    xlsx_file: ['', requiredFileType(this.xlsxExtensions)],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  submit() {
    console.log(this.form.value);
    console.log(toFormData(this.form.value));
    // this.http.post('apiiiii', toFormData(this.form.value)).subscribe(res => {
    //   console.log('respuestaaaaa',res);
    // });
  }

  hasError(field: string, error: string) {
    const control: any = this.form.get(field);
    return control.dirty && control.hasError(error);
  }

}

export const toFormData = (formValue: any) => {
  const formData = new FormData();
  for (const key of Object.keys(formValue)) {
    const value = formValue[key];
    formData.append(key, value);
  }
  return formData;
}


