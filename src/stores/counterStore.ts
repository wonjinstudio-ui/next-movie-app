import { create } from "zustand";

type CounterStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterStore>()((set) => ({
  count: 0,

  // 현재 숫자에 1을 더해서 저장합니다.
  increase: () => {
    set((state) => ({ count: state.count + 1 }));
  },

  // 현재 숫자에서 1을 빼서 저장합니다.
  decrease: () => {
    set((state) => ({ count: state.count - 1 }));
  },

  // 현재 숫자와 관계없이 0으로 저장합니다.
  reset: () => {
    set({ count: 0 });
  },
}));
