import { Directive, ElementRef, HostListener } from '@angular/core';
import { formatNumber } from '@angular/common';

@Directive({
  selector: '[appFormatNumber]'
})
export class FormatNumberDirective {
  private regexStr = '^[0-9]*$';
  constructor(private el: ElementRef) {}

  @HostListener('focus', ['$event']) onFocus(event: any) {
    this.el.nativeElement.value = (event.target.value as string).replace(
      /[, ]+/g,
      ''
    );
  }

  @HostListener('blur', ['$event']) onBlur(event) {
    const value = +(event.target.value as string).replace(
        /[, ]+/g,
        ''
      );
    this.el.nativeElement.value = formatNumber(
        value,
      'en-US'
    );
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    if (
      //   8: Backspace
      //   9: Tab
      //   13: Enter
      //   27: Escape
      //   46: Delete
      //   110 || 190: .
      [46, 8, 9, 27, 13, 110, 190].indexOf(keyCode) !== -1 ||
      // Allow: Ctrl+A
      (keyCode === 65 && event.ctrlKey === true) ||
      // Allow: Ctrl+C
      (keyCode === 67 && event.ctrlKey === true) ||
      // Allow: Ctrl+V
      (keyCode === 86 && event.ctrlKey === true) ||
      // Allow: Ctrl+X
      (keyCode === 88 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (keyCode >= 35 && keyCode <= 39)
    ) {
      return;
    }
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(event.key)) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
