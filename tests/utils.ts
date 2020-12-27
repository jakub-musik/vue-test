import { ActionContext } from "vuex";
import { makeInitialState, State } from "@/store/store";

export const makeActionContex = (
  {
    initialStateArguments
  }: {
    initialStateArguments: Parameters<typeof makeInitialState>;
  } = { initialStateArguments: [] }
) =>
  ({
    dispatch: jest.fn(),
    commit: jest.fn(),
    state: makeInitialState(...initialStateArguments),
    getters: {},
    rootState: makeInitialState(...initialStateArguments),
    rootGetters: {}
  } as ActionContext<State, State>);
