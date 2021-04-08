import groupPagesSliceReducer, { IGroupPagesArrState, setUserGroupPages } from "./groupPagesSlice";

describe("setUserGroupPages action", () => {
  it("adds groupPagesArr to state by group index", () => {

    const testState: IGroupPagesArrState = {
      value: [[{ name: "Страница 1", number: 1 }]],
    };

    const curState = groupPagesSliceReducer(
      testState,
      setUserGroupPages([
        [
          { name: "Страница 3", number: 3 },
          { name: "Страница 5", number: 5 },
          { name: "Страница 9", number: 9 },
        ],
        3,
      ])
    );

    expect(curState).toEqual({
      value: [
        [{ name: "Страница 1", number: 1 }],
        ,
        ,
        [
          { name: "Страница 3", number: 3 },
          { name: "Страница 5", number: 5 },
          { name: "Страница 9", number: 9 },
        ],
      ],
    });
  });

  it("removes groupPages arrs for all groups", () => {
    let testState = {
      value: [
        [
          { name: "Страница 1", number: 1 },
          { name: "Страница 2", number: 2 },
        ],
      ],
    };

    const curState = groupPagesSliceReducer(
      testState as IGroupPagesArrState,
      setUserGroupPages([null, null])
    );

    expect(curState).toEqual({
      value: [],
    });
  });
});
