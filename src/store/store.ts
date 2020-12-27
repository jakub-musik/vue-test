import { InjectionKey } from "vue";
import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from "vuex";
import { mutations, Mutations } from "./mutations";
import { actions, Actions } from "./actions";
import { LoadingStateEnum } from "../shared/loading-state.enum";

export type State = {
  superlotto: {
    numbers: string[];
    additionalNumbers: string[];
    expiresAt: number;
    date: number;
    loadingState: LoadingStateEnum;
  };
};

export const key: InjectionKey<VuexStore<State>> = Symbol();

export const makeInitialState = ({
  superlotto
}: {
  superlotto?: Partial<State["superlotto"]>;
} = {}) => ({
  superlotto: {
    numbers: [],
    additionalNumbers: [],
    expiresAt: 0,
    date: 0,
    loadingState: LoadingStateEnum.notStarted,
    ...superlotto
  }
});

export const store = createStore<State>({
  state: makeInitialState(),
  mutations,
  actions
});

export type Store = Omit<VuexStore<State>, "commit" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
