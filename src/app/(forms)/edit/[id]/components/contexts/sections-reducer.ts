import { BlockVariant } from "@/db/schema";
import { BlockVariantUnion, FormSection } from "@/lib/types/forms";
import { produce } from "immer";

type SectionsAction =
  | AddSectionAction
  | AppendBlockAction
  | SetBlocksAction
  | MutateBlockAction
  | DeleteSectionAction
  | DeleteBlockAction;

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

      const newBlock: BlockVariantUnion = {
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

    case "MUTATE_BLOCK": {
      const { sectionIndex, block } = action.payload;

      // Manually find index instead of passing an index through payload to prevent unwanted read collisions
      const blockIndex = currentSectionsState[sectionIndex].blocks.findIndex(
        (b) => b.id === block.id,
      );

      if (blockIndex < 0) {
        return currentSectionsState;
      }

      const newDraft = produce(currentSectionsState, (draft) => {
        draft[sectionIndex].blocks[blockIndex] = block;
      });

      return newDraft;
    }

    case "DELETE_SECTION": {
      const { sectionIndex } = action.payload;

      return produce(currentSectionsState, (draft) => {
        draft.splice(sectionIndex, 1);
      });
    }

    case "DELETE_BLOCK": {
      const { sectionIndex, blockId } = action.payload;

      const blockIndex = currentSectionsState[sectionIndex].blocks.findIndex(
        (block) => block.id === blockId,
      );

      return produce(currentSectionsState, (draft) => {
        draft[sectionIndex].blocks.splice(blockIndex, 1);
      });
    }

    case "SET_SECTION_BLOCKS": {
      const { sectionIndex, blocks } = action.payload;

      return produce(currentSectionsState, (draft) => {
        draft[sectionIndex].blocks = blocks;
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

type SetBlocksAction = {
  type: "SET_SECTION_BLOCKS";
  payload: {
    sectionIndex: number;
    blocks: FormSection["blocks"];
  };
};

type MutateBlockAction = {
  type: "MUTATE_BLOCK";
  payload: {
    sectionIndex: number;
    block: BlockVariantUnion;
  };
};

type DeleteSectionAction = {
  type: "DELETE_SECTION";
  payload: {
    sectionIndex: number;
  };
};

type DeleteBlockAction = {
  type: "DELETE_BLOCK";
  payload: {
    sectionIndex: number;
    blockId: string;
  };
};
