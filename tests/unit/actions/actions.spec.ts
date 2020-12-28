import { actions, ActionTypes } from "@/store/actions";
import * as gqlreq from "graphql-request";
import { MutationTypes } from "../../../src/store/mutations";
import { makeActionContex } from "../../utils";

describe("actions", () => {
  it(`${ActionTypes.fetchEurojackpot} should update when no numbers set`, async done => {
    jest.spyOn(gqlreq, "request").mockImplementationOnce(() =>
      Promise.resolve({
        draw: {
          draws: [
            {
              numbers: ["1"],
              additionalNumbers: ["2"],
              date: "Dec 11 2020"
            }
          ]
        }
      })
    );

    const actionContext = makeActionContex();

    await actions[ActionTypes.fetchEurojackpot](actionContext);

    const mockCommit = actionContext.commit as jest.Mock;
    expect(mockCommit.mock.calls).toEqual([
      [MutationTypes.startLoadingEurojackpot],
      [
        MutationTypes.updateEurojackpot,
        {
          numbers: ["1"],
          additionalNumbers: ["2"],
          date: new Date("Dec 11 2020")
        }
      ]
    ]);

    done();
  });

  it(`${ActionTypes.fetchEurojackpot} should not update when data is cached`, async done => {
    const actionContext = makeActionContex({
      initialStateArguments: [
        {
          eurojackpot: {
            numbers: ["0"],
            expiresAt: new Date("Dec 13 2099").getTime()
          }
        }
      ]
    });

    await actions[ActionTypes.fetchEurojackpot](actionContext);

    const mockCommit = actionContext.commit as jest.Mock;

    expect(mockCommit.mock.calls.length).toEqual(0);

    done();
  });
});
