import { BlockVariant } from "@/db/schema";
import { FormSection } from "@/lib/types/forms";
import { produce } from "immer";

type SectionsAction = AddSectionAction | AppendBlockAction;

export function sectionsReducer(
  state: FormSection[] | undefined,
  action: SectionsAction,
): FormSection[] {
  const currentSectionsState = state || [];

  switch (action.type) {
    case "APPEND_SECTION": {
      const { sectionId, title } = action.payload;
      const newSection = {
        id: sectionId,
        title,
        orderNum: currentSectionsState.length,
      };

      return produce(currentSectionsState, (draft) => {
        draft.push({ ...newSection, blocks: [] });
      });
    }

    case "APPEND_BLOCK": {
      const { sectionId, blockId, variant } = action.payload;

      const sectionIndex = currentSectionsState.findIndex(
        (section) => section.id === sectionId,
      );

      if (sectionIndex < 0) {
        return currentSectionsState;
      }

      const newBlock = {
        id: blockId,
        blockType: variant,
        orderNum: currentSectionsState[sectionIndex].blocks.length,
        text: "",
        description: "",
        required: false,
        sectionId,
        multipleChoiceOptions: [],
      };

      return produce(currentSectionsState, (draft) => {
        draft[sectionIndex].blocks.push(newBlock);
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
  };
};

type AppendBlockAction = {
  type: "APPEND_BLOCK";
  payload: {
    sectionId: string;
    blockId: string;
    variant: BlockVariant;
  };
};
