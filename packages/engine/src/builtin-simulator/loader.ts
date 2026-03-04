import { makeAutoObservable, observable } from 'mobx'
import type {ElementType} from 'react'
import { Page } from './components/page'

class Loader {
  components: Map<string, ElementType> = new Map([
    ["Page", Page]
  ]);
  constructor(){
    makeAutoObservable(this, {
      components: observable.shallow
    })
  }

  async loadAssets(urls: string[]) {
    const cssUrls = urls.filter(url => url.endsWith('.css'));
    const jsUrls = urls.filter(url => url.endsWith('.js'));
    await Promise.all([this.loadCss(cssUrls), this.loadJs(jsUrls)]);
  }

  private async loadCss(cssUrls: string[]) {
    const promises = cssUrls.map(url => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    });
    await Promise.all(promises);
  }

  private async loadJs(jsUrls: string[]) {
    const promises = jsUrls.map(async (url) => {
      const module = await import(url);
      for (const key in module) {
          this.components.set(key,module[key]);
        }
        if (module.default && typeof module.default === 'object') {
          for (const key in module.default) {
            this.components.set(key,module.default[key]);
          }
        }
    });
    await Promise.all(promises);
  }
}

export const loader = new Loader();
