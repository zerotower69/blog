import { Injectable } from '@nestjs/common';
import { Res } from './response';
import axios from 'axios';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getWebInfo(url: string) {
    try {
      const browser = await puppeteer.launch({
        headless: 'shell',
        devtools: false,
        args: ['--devtools-flags=disable'],
      });
      const page = await browser.newPage();
      await page.goto(url, {
        //等待网站均加载完
        waitUntil: 'domcontentloaded',
      });
      const info = await page.evaluate(() => {
        const descMetaEl = document.querySelector('meta[name="description"]');
        const desc = descMetaEl?.getAttribute('content') ?? '';
        const icon = document.querySelector('link[rel*="icon"]')?.getAttribute('href') ?? '';
        const host = window.location.host;
        const baseUrl = window.location.protocol + '//' + host;
        return { desc, icon, host, baseUrl };
      });
      await page.setViewport({ width: 150, height: 100 });
      const title = await page.title();
      const theUrl = page.url();
      await browser.close();
      return Res.OKWithData({
        title,
        url: theUrl,
        desc: info.desc,
        icon: this.getIcon(info.icon, info.baseUrl),
        host: info.host,
        baseUrl: info.baseUrl,
      });
    } catch (e) {
      console.log(e);
      return Res.Error('请求失败');
    }
  }
  //处理icon路径
  private getIcon(url: string, baseUrl: string) {
    if (!url || /^http(s)*/.test(url)) return url;
    if (url.startsWith('/')) {
      return baseUrl + url;
    }
    if (url.startsWith('./')) {
      return baseUrl + url.substring(1, url.length);
    }
    return baseUrl + '/' + url;
  }
}

//
function getIcon(url: string) {}
