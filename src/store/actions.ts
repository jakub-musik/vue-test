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
  fetchSuperlotto = "fetchSuperlotto"
}

export interface Actions {
  [ActionTypes.fetchSuperlotto]({
    commit
  }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.fetchSuperlotto]: async function({ commit, state }) {
    if (state.superlotto.expiresAt < new Date().getTime()) {
      commit(MutationTypes.startLoadingSuperlotto);

      const query = gql`
        {
          draw(type: "superlotto", limit: 1) {
            draws {
              numbers
              additionalNumbers
              date
            }
          }
        }
      `;

      try {
        const result = await request<DrawQueryResponse>(
          "https://www.lottohelden.de/graphql",
          query
        );

        console.log({ result });
        if (
          result?.draw?.draws?.[0]?.numbers &&
          result.draw.draws[0].date &&
          result.draw.draws[0].additionalNumbers
        ) {
          commit(MutationTypes.updateSuperlotto, {
            numbers: result.draw.draws[0].numbers,
            additionalNumbers: result.draw.draws[0].additionalNumbers,
            date: new Date(result.draw.draws[0].date)
          });
        } else {
          throw new Error("Invalid draw data");
        }
      } catch (error) {
        //   TODO: improve error handling
        commit(MutationTypes.errorWhileLoadingSuperlotto);

        console.error(error);
      }
    }
  }
};
