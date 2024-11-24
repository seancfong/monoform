"use client";

import { sectionsReducer } from "@/app/(forms)/edit/[id]/components/contexts/sections-reducer";
import { BlockVariant } from "@/db/schema";
import appendBlockToSection from "@/lib/actions/forms/mutations/append-block";
import createSection from "@/lib/actions/forms/mutations/create-section";
import { BlockVariantUnion, FormSection } from "@/lib/types/forms";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  startTransition,
  use,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { default as deleteSectionAction } from "@/lib/actions/forms/mutations/delete-section";
import { default as deleteBlockAction } from "@/lib/actions/forms/mutations/delete-block";
import reorderSectionBlocks from "@/lib/actions/forms/mutations/reorder-section-blocks";

interface SectionsContextValue {
  formId: string;
  sections: FormSection[];
  appendSection: (title: string) => void;
  appendBlock: (section: FormSection, variant: BlockVariant) => void;
  mutateBlock: (
    sectionIndex: number,
    block: BlockVariantUnion,
    action: () => Promise<void>,
  ) => void;
  deleteSection: (sectionIndex: number) => void;
  deleteBlock: (sectionIndex: number, blockDraft: BlockVariantUnion) => void;
  setSectionBlocks: (
    sectionIndex: number,
    blocks: FormSection["blocks"],
  ) => void;

  focusedBlockId: string | undefined;
  setFocusedBlockId: Dispatch<SetStateAction<string | undefined>>;

  reorderingBlockId: string | undefined;
  setReorderingBlockId: Dispatch<SetStateAction<string | undefined>>;
}

const SectionsContext = createContext<SectionsContextValue | undefined>(
  undefined,
);

type SectionsProviderProps = {
  children: ReactNode;
  formId: string;
  sectionsPromise: Promise<FormSection[]>;
};

export const SectionsProvider = ({
  children,
  formId,
  sectionsPromise,
}: SectionsProviderProps) => {
  const initialSections = use(sectionsPromise);
  const [optimisticSections, updateOptimisticSections] = useOptimistic(
    initialSections,
    sectionsReducer,
  );
  const [focusedBlockId, setFocusedBlockId] = useState<string>();
  const [reorderingBlockId, setReorderingBlockId] = useState<string>();

  const appendSection = useCallback(
    (title: string) => {
      const sectionId = uuidv4();

      startTransition(async () => {
        updateOptimisticSections({
          type: "APPEND_SECTION",
          payload: {
            sectionId,
            title,
          },
        });

        await createSection(formId, {
          id: sectionId,
          title,
          formId,
          orderNum: optimisticSections.length,
        });
      });
    },
    [formId, optimisticSections.length, updateOptimisticSections],
  );

  const appendBlock = useCallback(
    async (section: FormSection, variant: BlockVariant) => {
      const blockId = uuidv4();

      startTransition(async () => {
        updateOptimisticSections({
          type: "APPEND_BLOCK",
          payload: {
            sectionId: section.id,
            blockId,
            variant,
          },
        });

        await appendBlockToSection(
          section.id,
          {
            id: blockId,
            sectionId: section.id,
            orderNum: section.blocks.length,
            blockType: variant,
            text: "",
          },
          formId,
        );
      });
    },
    [formId, updateOptimisticSections],
  );

  const mutateBlock = useCallback(
    (
      sectionIndex: number,
      block: BlockVariantUnion,
      action: () => Promise<void>,
    ) => {
      startTransition(async () => {
        updateOptimisticSections({
          type: "MUTATE_BLOCK",
          payload: {
            sectionIndex,
            block,
          },
        });

        await action();
      });
    },
    [updateOptimisticSections],
  );

  const deleteSection = useCallback(
    async (sectionIndex: number) => {
      startTransition(async () => {
        updateOptimisticSections({
          type: "DELETE_SECTION",
          payload: {
            sectionIndex,
          },
        });
      });

      console.log("deleting", optimisticSections[sectionIndex]);
      await deleteSectionAction(formId, optimisticSections[sectionIndex]);
    },
    [formId, optimisticSections, updateOptimisticSections],
  );

  const deleteBlock = useCallback(
    async (sectionIndex: number, blockDraft: BlockVariantUnion) => {
      startTransition(async () => {
        updateOptimisticSections({
          type: "DELETE_BLOCK",
          payload: {
            sectionIndex,
            blockId: blockDraft.id,
          },
        });
      });

      await deleteBlockAction(formId, blockDraft);
    },
    [updateOptimisticSections],
  );

  const setSectionBlocks = useCallback(
    async (sectionIndex: number, blockListDraft: FormSection["blocks"]) => {
      const draftIds = blockListDraft.map((block) => block.id);

      startTransition(() => {
        updateOptimisticSections({
          type: "SET_SECTION_BLOCKS",
          payload: {
            sectionIndex,
            blocks: blockListDraft,
          },
        });
      });

      const sectionId = optimisticSections[sectionIndex].id;

      await reorderSectionBlocks(formId, sectionId, draftIds);
    },
    [updateOptimisticSections],
  );

  const value = useMemo(() => {
    return {
      formId,
      sections: optimisticSections,
      appendSection,
      appendBlock,
      focusedBlockId,
      setFocusedBlockId,
      mutateBlock,
      deleteSection,
      deleteBlock,
      setSectionBlocks,
      reorderingBlockId,
      setReorderingBlockId,
    };
  }, [
    formId,
    optimisticSections,
    appendSection,
    appendBlock,
    focusedBlockId,
    mutateBlock,
    deleteSection,
    deleteBlock,
    setSectionBlocks,
    reorderingBlockId,
    setReorderingBlockId,
  ]);

  return (
    <SectionsContext.Provider value={value}>
      {children}
    </SectionsContext.Provider>
  );
};

export const useSectionsContext = (): SectionsContextValue => {
  const context = useContext(SectionsContext);

  if (context === undefined) {
    throw new Error("useSectionsContext must be used within a SidebarProvider");
  }

  return context;
};
