import { Component, ViewChild, OnInit, Renderer2 } from "@angular/core";
import { DragScrollComponent } from "ngx-drag-scroll";
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from './services/theme.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  currentIndex = 0;
  indexChanged:any;
  theme: any;
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

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      this.moveTo(2);
    }, 0);
    this.currentIndex = this.ds.currIndex;
    console.log('test');
  }

  moveLeft() {
    this.ds.moveLeft();
    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
    }
  }

  moveRight() {
    this.ds.moveRight();
    if (this.currentIndex !== 4) {
      this.currentIndex += 1;
    }
  }

  moveTo(index) {
    this.ds.moveTo(index);
    this.currentIndex = index;
        console.log(this.ds.currIndex);
  }
}
