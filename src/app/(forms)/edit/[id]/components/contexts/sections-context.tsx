"use client";

import { sectionsReducer } from "@/app/(forms)/edit/[id]/components/contexts/sections-reducer";
import { BlockVariant } from "@/db/schema";
import appendBlockToSection from "@/lib/actions/forms/mutations/append-block";
import createSection from "@/lib/actions/forms/mutations/create-section";
import { FormSection } from "@/lib/types/forms";
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

interface SectionsContextValue {
  formId: string;
  sections: FormSection[];
  appendSection: (title: string) => void;
  appendBlock: (section: FormSection, variant: BlockVariant) => void;
  focusedBlockId: string | undefined;
  setFocusedBlockId: Dispatch<SetStateAction<string | undefined>>;
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

  const appendSection = useCallback(
    async (title: string) => {
      const sectionId = uuidv4();

      startTransition(() => {
        updateOptimisticSections({
          type: "APPEND_SECTION",
          payload: {
            sectionId,
            title,
          },
        });
      });

      await createSection(formId, {
        id: sectionId,
        title,
        formId,
        orderNum: optimisticSections.length,
      });
    },
    [formId, optimisticSections.length, updateOptimisticSections],
  );

  const appendBlock = useCallback(
    async (section: FormSection, variant: BlockVariant) => {
      const blockId = uuidv4();

      startTransition(() => {
        updateOptimisticSections({
          type: "APPEND_BLOCK",
          payload: {
            sectionId: section.id,
            blockId,
            variant,
          },
        });
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
    },
    [formId, updateOptimisticSections],
  );

  const value = useMemo(() => {
    return {
      formId,
      sections: optimisticSections,
      appendSection,
      appendBlock,
      focusedBlockId,
      setFocusedBlockId,
    };
  }, [formId, optimisticSections, appendSection, appendBlock, focusedBlockId]);

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
