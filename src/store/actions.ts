import { ActionTree, ActionContext } from "vuex";
import { State } from "./store";
import { Mutations, MutationTypes } from "./mutations";
import { request, gql } from "graphql-request";
import { DrawQueryResponse } from "graphql.types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export enum ActionTypes {
  fetchEurojackpot = "fetchEurojackpot"
}

export interface Actions {
  [ActionTypes.fetchEurojackpot]({
    commit
  }: AugmentedActionContext): Promise<void>;
}

const fetchEurojackpotQuery = gql`
  {
    draw(type: "eurojackpot", limit: 1) {
      draws {
        numbers
        additionalNumbers
        date
      }
    }
  }
`;

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.fetchEurojackpot]: async function({ commit, state }) {
    if (state.eurojackpot.expiresAt < new Date().getTime()) {
      commit(MutationTypes.startLoadingEurojackpot);

      try {
        const result = await request<DrawQueryResponse>(
          "https://www.lottohelden.de/graphql",
          fetchEurojackpotQuery
        );

        if (
          result?.draw?.draws?.[0]?.numbers &&
          result.draw.draws[0].date &&
          result.draw.draws[0].additionalNumbers
        ) {
          commit(MutationTypes.updateEurojackpot, {
            numbers: result.draw.draws[0].numbers,
            additionalNumbers: result.draw.draws[0].additionalNumbers,
            date: new Date(result.draw.draws[0].date)
          });
        } else {
          throw new Error("Invalid draw data");
        }
      } catch (error) {
        //   TODO: improve error handling
        commit(MutationTypes.errorWhileLoadingEurojackpot);

        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }
};
