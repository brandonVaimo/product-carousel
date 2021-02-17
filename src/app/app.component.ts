import { Component, ViewChild, OnInit, Renderer2 } from "@angular/core";
import { DragScrollComponent } from "ngx-drag-scroll";
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { ThemeService } from './services/theme.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  theme: string;
  title = "product-carousel";
  currentIndex = 0;
  arrowRight = faChevronRight;
  arrowLeft = faChevronLeft;

  @ViewChild("nav", { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(private themeService: ThemeService, private renderer: Renderer2){}

  ngOnInit(): void {
    this.themeService.themeChanges().subscribe((theme) => {
      if (theme.oldValue) {
        this.renderer.removeClass(document.body, theme.oldValue);
      }
      this.renderer.addClass(document.body, theme.newValue);
      this.theme = theme.newValue;
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.moveTo(2);
    }, 0);
    this.currentIndex = this.ds.currIndex;
  }

  moveLeft(): void {
    this.ds.moveLeft();
    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
    }
  }

  moveRight(): void {
    this.ds.moveRight();
    if (this.currentIndex !== 4) {
      this.currentIndex += 1;
    }
  }

  moveTo(index): void {
    this.ds.moveTo(index);
    this.currentIndex = index;
  }
}
