// store.ts
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// define your typings for the store state
export interface State {
  superlotto: {
    numbers: string[];
    expiresAt: number;
    date: number;
  };
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    superlotto: {
      numbers: [],
      expiresAt: 0,
      date: 0
    }
  }
});
