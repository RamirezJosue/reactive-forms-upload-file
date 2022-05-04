import { FormControl } from '@angular/forms';

export const requiredFileType =( types: any[] ) => {
  return ( control: FormControl ) => {
    const name = control.value?.name;
    if ( name ) {
      if ( types.includes(`.${name.split('.').reverse()[0]}`)) return null;
      return {requiredFileType: true};
    }
    return null;
  };
}

export const maxSizeFile = (max_size: number) => {
  return (control: FormControl) => {
    const size = control.value?.size;
    if (size) {
      if (size <= max_size) return null;
      return { maxSizeFile: true };
    }
    return null;
  }
}
