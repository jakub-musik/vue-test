import { mutations, MutationTypes } from "@/store/mutations";
import { makeInitialState } from "@/store/store";
import { LoadingStateEnum } from "@/shared/loading-state.enum";

// destructure assign `mutations`
const { [MutationTypes.updateSuperlotto]: updateSuperlotto } = mutations;

describe("mutations", () => {
  it("should update superlotto state with new results", () => {
    const state = makeInitialState();

    updateSuperlotto(state, {
      date: new Date("2020 Dec 12"),
      numbers: ["42", "70"],
      additionalNumbers: ["1"]
    });

    expect(state.superlotto).toEqual(
      expect.objectContaining({
        expiresAt: new Date(Date.UTC(2020, 11, 16, 17, 20, 0)).getTime(),
        numbers: ["42", "70"],
        additionalNumbers: ["1"],
        loadingState: LoadingStateEnum.loaded
      })
    );
  });
});
