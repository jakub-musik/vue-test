import { mutations, MutationTypes } from "@/store/mutations";
import { makeInitialState } from "@/store/store";
import { LoadingStateEnum } from "@/shared/loading-state.enum";

// destructure assign `mutations`
const { [MutationTypes.updateEurojackpot]: updateEurojackpot } = mutations;

describe("mutations", () => {
  it("should update eurojackpot state with new results", () => {
    const state = makeInitialState();

    updateEurojackpot(state, {
      date: new Date("2020 Dec 11"),
      numbers: ["42", "70"],
      additionalNumbers: ["1"]
    });

    expect(state.eurojackpot).toEqual(
      expect.objectContaining({
        expiresAt: new Date(Date.UTC(2020, 11, 18, 18, 55, 0)).getTime(),
        numbers: ["42", "70"],
        additionalNumbers: ["1"],
        loadingState: LoadingStateEnum.loaded
      })
    );
  });
});
