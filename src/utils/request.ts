// @ts-ignore
import type { ResponseData } from '../../globals.d.ts';
import { showMessage } from './common';

export class Request {
  baseUrl: string; // 请求根路径
  url: string; // 请求 url 地址
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // 请求方式
  data: any; // 请求参数
  header: { [key: string]: string }; // 请求头
  beforeRequest: ((req: Request) => void) | null;
  afterRequest: ((res: any) => void) | null;

  constructor(options: { baseUrl?: string; url?: string; header?: { [key: string]: string } } = {}) {
    this.baseUrl = options.baseUrl || '';
    this.url = options.url || '';
    this.method = 'GET';
    this.data = null;
    this.header = options.header || {};
    this.beforeRequest = null;
    this.afterRequest = null;
  }

  get<R = ResponseData<any>, D = any>(url: string, data?: D): Promise<R>;
  get(url: string, data = {}) {
    this.method = 'GET';
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }

  post<R = ResponseData<any>, D = any>(url: string, data?: D): Promise<R>;
  post(url: string, data = {}) {
    this.method = 'POST';
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }

  put<R = ResponseData<any>, D = any>(url: string, data?: D): Promise<R>;
  put(url: string, data = {}) {
    this.method = 'PUT';
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }

  delete<R = ResponseData<any>, D = any>(url: string, data?: D): Promise<R>;
  delete(url: string, data = {}) {
    this.method = 'DELETE';
    this.url = this.baseUrl + url;
    this.data = data;
    return this._();
  }

  _() {
    // 请求之前做一些事
    this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this);
    // 发起请求
    return new Promise((resolve, reject) => {
      let weixin = wx;
      // 适配 uniapp
      if ('undefined' !== typeof uni) {
        weixin = uni;
      }
      weixin.request({
        url: this.url,
        method: this.method,
        data: this.data,
        header: this.header,
        success: async (res: any) => {
          const { code } = res.data || {};
          if (code === 40000) {
            uni.removeStorageSync('token');
            uni.removeStorageSync('key');
            uni.removeStorageSync('info');
            await showMessage('登陆失效');
            uni.navigateTo({ url: '/pages/login/index' });
          } else {
            resolve(res.data);
          }
        },
        fail: (err: any) => {
          reject(err);
        },
        complete: (res: any) => {
          // 请求完成以后做一些事情
          this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res);
        },
      });
    });
  }
}

export const $http = new Request({
  // baseUrl: 'https://www.rosabi.cn/user-center/v1',
  // baseUrl: 'http://192.168.0.42:8040/v1', // 后端 本地
  baseUrl: 'http://114.132.45.214:9091', // 生产环境
});

$http.beforeRequest = function (req: Request) {
  // 配置发起网络请求前的拦截功能
  uni.showLoading({ title: '加载中...' });
  // 登录凭证
  if (req.url !== '/login') {
    const token = uni.getStorageSync('token');
    token && (req.header.Authorization = `Bearer ${token}`);
  }
};

$http.afterRequest = function () {
  // 配置网络请求完毕后的拦截功能
  // @ts-ignore
  uni.hideLoading({ noConflict: true });
};
