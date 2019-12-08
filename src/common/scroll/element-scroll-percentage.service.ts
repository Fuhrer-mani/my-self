import { fromEvent, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

let version = 0;


type Target = Document | Element;

@Injectable({
  providedIn: 'root'
})
export class ElementScrollPercentageService {

  private oldScrollPosition = 0;
  currentVersion;


  constructor() {
    version = version + 1;
    this.currentVersion = version;
  }

  public getScroll(node: Target = document): number {

    const currentScroll = this.getCurrentScroll(node);
    const maxScroll = this.getMaxScroll(node);
    let percent = (currentScroll / Math.max(maxScroll, 1));
    percent = Math.max(percent, 0);
    percent = Math.min(percent, 1);
    return (percent * 100);

  }

  public getScrollAsStream(node: Target = document): Observable<number> {
    if (node instanceof Document) {

      // When we watch the DOCUMENT, we need to pull the scroll event from the
      // WINDOW, but then check the scroll offsets of the DOCUMENT.
      return fromEvent(window, 'wheel').pipe(
        exhaustMap(event => of(this.getScroll(document))
        // map(
        //   (event: UIEvent): number => {
        //     return ();
        //   }
        )
      );

    } else {

      // When we watch an ELEMENT node, we can pull the scroll event and the scroll
      // offsets from the same ELEMENT node (unlike the Document version).
      return fromEvent(node, 'wheel').pipe(
        map(
          (event: UIEvent): number => {

            return (this.getScroll(node));

          }
        )
      );

    }
  }

  getScrollUpOrDown(oldScrollPosition?) {
    this.oldScrollPosition = this.getCurrentScroll(document);
    const maxScroll = this.getMaxScroll(document);
    return this.getScrollAsStream()
      .pipe(
        map((newScrollPosition: number) => {
          const isDown = this.oldScrollPosition < this.getCurrentScroll(document);
          console.log(this.oldScrollPosition, this.getCurrentScroll(document));
          this.oldScrollPosition = this.getCurrentScroll(document);
          return isDown;
        }
        ));
  }

  activeElement() {

  }



  // ---
  // PRIVATE METHODS.
  // ---

  // I return the current scroll offset (in pixels) of the given DOM node.
  private getCurrentScroll(node: Target): number {

    if (node instanceof Document) {

      return (window.pageYOffset);

    } else {

      return (node.scrollTop);

    }

  }


  // I return the maximum scroll offset (in pixels) of the given DOM node.
  private getMaxScroll(node: Target): number {

    // When we want to get the available scroll height of the DOCUMENT, things get
    // a little peculiar from a cross-browser consistency standpoint. As such, when
    // dealing with the Document node, we have to look in a few different places.
    // --
    // READ MORE: https://javascript.info/size-and-scroll-window
    if (node instanceof Document) {

      const scrollHeight = Math.max(
        node.body.scrollHeight,
        node.body.offsetHeight,
        node.body.clientHeight,
        node.documentElement.scrollHeight,
        node.documentElement.offsetHeight,
        node.documentElement.clientHeight
      );

      const clientHeight = node.documentElement.clientHeight;

      return (scrollHeight - clientHeight);

    } else {
      return (node.scrollHeight - node.clientHeight);
    }

  }

}
