import { FormSection } from "@/lib/types/forms";
import { produce } from "immer";

type SectionsAction = AddSectionAction;

export function sectionsReducer(
  state: FormSection[] | undefined,
  action: SectionsAction,
): FormSection[] {
  const currentSectionsState = state || [];

  switch (action.type) {
    case "APPEND_SECTION": {
      const { sectionId, title, formId } = action.payload;
      const newSection = {
        id: sectionId,
        title,
        orderNum: currentSectionsState.length,
      };

      return produce(currentSectionsState, (draft) => {
        draft.push({ ...newSection, blocks: [] });
      });
    }
    default:
      return currentSectionsState;
  }
}

type AddSectionAction = {
  type: "APPEND_SECTION";
  payload: {
    sectionId: string;
    title: string;
    formId: string;
  };
};
