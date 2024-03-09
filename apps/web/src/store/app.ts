import { defineStore } from "pinia";

interface AppState {
  showHeader: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      showHeader: true,
    };
  },
  actions: {
    setHeader(val: boolean) {
      this.showHeader = val;
    },
  },
});
