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

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    img_file: [null, [Validators.required, requiredFileType(this.imgExtensions)]],
    pdf_file: [null, [Validators.required, requiredFileType(this.pdfExtensions), maxSizeFile(5242880)]],
    xml_file: [null, requiredFileType(this.xmlExtensions)],
    xlsx_file: [null, requiredFileType(this.xlsxExtensions)],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  removeFile(type: string) {
    switch (type) {
      case 'img_file':
        this.form.get('img_file')?.reset(null);
        break;
      case 'pdf_file':
        this.form.get('pdf_file')?.reset(null);
        break;
      case 'xml_file':
        this.form.get('xml_file')?.reset(null);
        break;
      case 'xlsx_file':
        this.form.get('xlsx_file')?.reset(null);
        break;
      default:
        break;
    }
  }

  submit() {
    console.log('hfbsebfsehfsehjbfhjbsefhjse',this.form.value);
    // console.log(toFormData(this.form.value));
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


