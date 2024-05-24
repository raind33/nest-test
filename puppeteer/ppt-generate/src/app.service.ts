import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Observable, Subscriber } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pptxgen = require('pptxgenjs');
let cache = null;
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUniversityData() {
    if (cache) {
      return cache;
    }
    async function getData(observer: Subscriber<Record<string, any>>) {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
          width: 0,
          height: 0,
        },
      });

      const page = await browser.newPage();
      await page.goto('https://www.icourse163.org/university/view/all.htm');
      await page.waitForSelector('.u-usitys');
      const universityList = await page.$eval('.u-usitys', (el) => {
        return [...el.querySelectorAll('.u-usity')].map((item) => {
          return {
            name: item.querySelector('img').alt,
            src: item.querySelector('img').src,
            link: item.getAttribute('href'),
            content: '',
          };
        });
      });
      const ppt = new pptxgen();
      for (const item of universityList.slice(0, 6)) {
        const detail = await browser.newPage();
        await detail.goto(`https://www.icourse163.org/${item.link}`);
        await detail.waitForSelector('.m-cnt');
        const content = await detail.$eval('.m-cnt p', (el) => el.textContent);
        item.content = content;
        const slide = ppt.addSlide();

        slide.addText(item.name, {
          x: '10%',
          y: '10%',
          color: '#ff0000',
          fontSize: 30,
          align: ppt.AlignH.center,
        });

        slide.addImage({
          path: item.src,
          x: '42%',
          y: '25%',
        });

        slide.addText(item.content, {
          x: '10%',
          y: '60%',
          color: '#000000',
          fontSize: 14,
        });
        observer.next({ data: item });
      }
      await browser.close();
      await ppt.writeFile({
        fileName: '中国所有大学.pptx',
      });
      cache = universityList;
    }
    return new Observable((observer) => {
      getData(observer);
    });
  }
}
