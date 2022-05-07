import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent {
  @Input() accept: any[] = [];
  @Output() remove = new EventEmitter<boolean>();
  onChange!: Function;
  public file: File | null = null;

  isFile: boolean = true;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.isFile = false;
  }

  constructor(private host: ElementRef<HTMLInputElement>){}

  writeValue(value?: null) {
    // Limpiar archivo del input
    this.isFile = true;
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  onRemove() {
    this.remove.emit(true);
  }
}
