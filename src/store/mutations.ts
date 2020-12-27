import { MutationTree } from "vuex";
import { LoadingStateEnum } from "../shared/loading-state.enum";
import { State } from "./store";

export enum MutationTypes {
  updateSuperlotto = "updateSuperlotto",
  startLoadingSuperlotto = "startLoadingSuperlotto",
  errorWhileLoadingSuperlotto = "errorWhileLoadingSuperlotto"
}

export type UpdateSuperlottoMutationPayload = {
  date: Date;
  numbers: string[];
  additionalNumbers: string[];
};

export type Mutations<S = State> = {
  [MutationTypes.updateSuperlotto](
    state: S,
    payload: UpdateSuperlottoMutationPayload
  ): void;
  [MutationTypes.startLoadingSuperlotto](state: S): void;
  [MutationTypes.errorWhileLoadingSuperlotto](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.updateSuperlotto](
    state,
    payload: UpdateSuperlottoMutationPayload
  ) {
    const localDate = new Date(payload.date);

    // if saturday, next is wednesday
    const isSaturday = localDate.getDay() === 6;

    // The Germany Lotto draw takes place twice a week on Wednesday and Saturday. The draws run at 5:25 pm and 6:25 pm (UTC)
    // hours are back by 5 minutes to always refresh when close to next draw
    const hours = isSaturday ? [17, 20, 0] : [18, 20, 0];

    const daysToNextLotto = isSaturday ? 4 : 3;

    const nextLottoUtcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate() + daysToNextLotto,
        ...hours
      )
    );

    state.superlotto.loadingState = LoadingStateEnum.loaded;
    state.superlotto.numbers = payload.numbers;
    state.superlotto.date = payload.date.getTime();
    state.superlotto.expiresAt = nextLottoUtcDate.getTime();
    state.superlotto.additionalNumbers = payload.additionalNumbers;
  },
  [MutationTypes.startLoadingSuperlotto](state) {
    state.superlotto.loadingState = LoadingStateEnum.loading;
  },
  [MutationTypes.errorWhileLoadingSuperlotto](state) {
    state.superlotto.loadingState = LoadingStateEnum.failed;
  }
};
