import { MutationTree } from "vuex";
import { LoadingStateEnum } from "../shared/loading-state.enum";
import { State } from "./store";

export enum MutationTypes {
  updateEurojackpot = "updateEurojackpot",
  startLoadingEurojackpot = "startLoadingEurojackpot",
  errorWhileLoadingEurojackpot = "errorWhileLoadingEurojackpot"
}

export type UpdateEurojackpotMutationPayload = {
  date: Date;
  numbers: string[];
  additionalNumbers: string[];
};

export type Mutations<S = State> = {
  [MutationTypes.updateEurojackpot](
    state: S,
    payload: UpdateEurojackpotMutationPayload
  ): void;
  [MutationTypes.startLoadingEurojackpot](state: S): void;
  [MutationTypes.errorWhileLoadingEurojackpot](state: S): void;
};

// eurojackpot is drawn every friday at 7pn UTC
// hours are back by 5 minutes to always refresh when close to next draw
const eurojackpotDrawHour = [18, 55, 0];
const daysToNextEurojackpot = 7;

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.updateEurojackpot](
    state,
    payload: UpdateEurojackpotMutationPayload
  ) {
    const localDate = new Date(payload.date);

    const nextEurojackpotUtcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate() + daysToNextEurojackpot,
        ...eurojackpotDrawHour
      )
    );

    state.eurojackpot.loadingState = LoadingStateEnum.loaded;
    state.eurojackpot.numbers = payload.numbers;
    state.eurojackpot.date = payload.date.getTime();
    state.eurojackpot.expiresAt = nextEurojackpotUtcDate.getTime();
    state.eurojackpot.additionalNumbers = payload.additionalNumbers;
  },
  [MutationTypes.startLoadingEurojackpot](state) {
    state.eurojackpot.loadingState = LoadingStateEnum.loading;
  },
  [MutationTypes.errorWhileLoadingEurojackpot](state) {
    state.eurojackpot.loadingState = LoadingStateEnum.failed;
  }
};
