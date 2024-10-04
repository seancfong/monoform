import { SelectSections } from "@/db/schema";
import { produce } from "immer";

type SectionsAction = AddSectionAction;

export function sectionsReducer(
  state: SelectSections[] | undefined,
  action: SectionsAction,
): SelectSections[] {
  const currentSectionsState = state || [];

  switch (action.type) {
    case "ADD_SECTION": {
      const { sectionId, title } = action.payload;
      const newSection = {
        id: -1,
        title,
        orderNum: currentSectionsState.length,
        formId: "",
      };

      return produce(currentSectionsState, (draft) => {
        draft.push(newSection);
      });
    }
    default:
      return currentSectionsState;
  }
}

type AddSectionAction = {
  type: "ADD_SECTION";
  payload: {
    sectionId: string;
    title: string;
  };
};
