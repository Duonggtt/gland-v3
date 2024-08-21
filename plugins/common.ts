import { useToast } from 'primevue/usetoast';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const toast = useToast();

  const common = {
    hello: () => {
      console.log('Hello World');
    },
    
    getRandomKey: (length: number = 8): string => {
      let randomNumber = Math.floor(Math.random() * 10000) + 1;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomText = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
      }
      return randomText + randomNumber;
    },

    getKeyFromText: (key: string = '', length: number = 6): string => {
      key = key.replace(/\s/g, '').replace(/[^\x00-\x7F]/g, '').toLowerCase();
      return key.length > length ? key.substring(0, length) : key;
    },

    baseUrl: (url: string): string => {
      if (typeof window !== 'undefined') {
        const protocol = window.location.protocol;
        const host = window.location.host;
        return `${protocol}//${host}/${url}`;
      } else {
        console.error('Window is undefined !');
        return '';
      }
    },

    getTableShowColumn: (tableHead: Array<{ show: boolean }>): string => {
      return tableHead.map(item => (item.show ? '1' : '0')).join('');
    },

    toggleModal: (modalId: string): void => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.toggle('hidden');
      } else {
        console.error(`common.js : Modal with id ${modalId} is not defined`);
      }
    },

    showSuccess: (msg: string = 'Thao tác thành công'): void => {
      toast.add({ severity: 'success', summary: 'Thành công', detail: msg, life: 3000 });
    },

    showError: (msg: string = 'Thao tác thất bại'): void => {
      toast.add({ severity: 'error', summary: 'Thất bại', detail: msg, life: 3000 });
    },

    showWarning: (msg: string = 'Cảnh báo'): void => {
      toast.add({ severity: 'warn', summary: 'Cảnh báo', detail: msg, life: 3000 });
    },

    isNullOrEmpty: (value: any): boolean => {
      return value === null || value === undefined || value === '';
    },

    getAvailable: (data: any): any => {
      return data || '';
    },

    returnDefaultIfNull: <T>(data: T | null | undefined, defaultValue: T): T => {
      return data === null || data === undefined ? defaultValue : data;
    },

    getSvgIcon: (image: string): string => {
      if (!image) return '';
      try {
        const imgPath = require(`~/assets/icon/${image}`);
        return imgPath;
      } catch (e) {
        return '';
      }
    },

    resetCookies: (token: string, minute: number): void => {
      const oneMinute = 60000;
      const now = new Date();
      const expired = new Date(now.getTime() + minute * oneMinute);
      Cookies.set('jwt', token, { expires: expired });
    },

    setAdmin: (isAdmin: boolean, minute: number): void => {
      const oneMinute = 60000;
      const now = new Date();
      const expired = new Date(now.getTime() + minute * oneMinute);
      Cookies.set('isAdmin', isAdmin.toString(), { expires: expired });
    },

    setRole: (role: string, minute: number): void => {
      const oneMinute = 60000;
      const now = new Date();
      const expired = new Date(now.getTime() + minute * oneMinute);
      Cookies.set('role', role, { expires: expired });
    },

    getRole: (): string | undefined => {
      return Cookies.get('role');
    },

    getAdmin: (): boolean => {
      return Cookies.get('isAdmin') === 'true';
    },

    removeCookies: (): void => {
      Cookies.remove('jwt');
      Cookies.remove('isAdmin');
    },

    isLogin: (): string | undefined => {
      return Cookies.get('jwt');
    },

    formatDateTime: (date: string | Date): string => {
      if (!date) return '';
      try {
        return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
      } catch (e) {
        console.error(e);
        return '';
      }
    },
  };

  return {
    provide: {
      common,
    },
  };
});
