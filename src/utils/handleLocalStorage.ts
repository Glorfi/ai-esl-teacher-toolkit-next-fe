// export class LocalStorageHanlder {
//   setJwt(value: string) {
//     window.localStorage.setItem('jwt', value);
//   }
//   getJwt() {
//     return window.localStorage.getItem('jwt');
//   }
//   clearJwt() {
//     window.localStorage.removeItem('jwt');
//   }
// }

export const LSHandler = {
  setJwt: (value: string) => {
    window.localStorage.setItem('jwt', value);
  },
  getJwt: () => {
    return window.localStorage.getItem('jwt');
  },
  clearJwt: () => {
    window.localStorage.removeItem('jwt');
  },
};
