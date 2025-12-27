import { init, isTMA } from "@tma.js/sdk-vue";

export default defineNuxtPlugin((nuxtApp) => {
  // return {
  //   provide: {
  //     tma: (msg: string) => {
  //       console.log('isTMA:', isTMA())

  //       if (isTMA()) {
  //         init();
  //       }
  //     },
  //   },
  // };

  console.log("isTMA:", isTMA());

  if (isTMA()) {
    init();
  }
});
