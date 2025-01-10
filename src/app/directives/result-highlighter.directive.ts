import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[resultHighlighter]'
})
export class ResultHighlighterDirective implements OnChanges {

  @Input() value: string = '';
  @Input() query: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['query']) {
      this.highlight();
    }
  }

  private highlight(): void {
    this.el.nativeElement.innerHTML = '';

    if (!this.value || !this.query) {
      this.renderer.appendChild(this.el.nativeElement, this.createTextNode(this.value));
      return;
    }
    const queryIndex = this.value.toLowerCase().indexOf(this.query.toLowerCase());

    if (queryIndex === -1) {
      this.renderer.appendChild(this.el.nativeElement, this.createTextNode(this.value));
    } else {
      const beforeMatch = this.value.substring(0, queryIndex);
      const match = this.value.substring(queryIndex, queryIndex + this.query.length);
      const afterMatch = this.value.substring(queryIndex + this.query.length);

      if (beforeMatch) {
        this.renderer.appendChild(this.el.nativeElement, this.createSpanNode(beforeMatch));
      }

      if (match) {
        this.renderer.appendChild(this.el.nativeElement, this.createMarkNode(match));
      }

      if (afterMatch) {
        this.renderer.appendChild(this.el.nativeElement, this.createSpanNode(afterMatch));
      }
    }
  }

  private createMarkNode(text: string): HTMLElement {
    const mark = this.renderer.createElement('mark');
    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(mark, textNode);

    this.renderer.setStyle(mark, 'padding', '0');
    this.renderer.setStyle(mark, 'backgroundColor', 'lightBlue');

    return mark;
  }

  private createSpanNode(text: string): HTMLElement {
    const span = this.renderer.createElement('span');
    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(span, textNode);
    return span;
  }

  private createTextNode(text: string): Text {
    return this.renderer.createText(text);
  }
}
