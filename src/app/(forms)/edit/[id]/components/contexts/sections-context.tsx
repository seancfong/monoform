"use client";

import { sectionsReducer } from "@/app/(forms)/edit/[id]/components/contexts/sections-reducer";
import createSection from "@/lib/actions/forms/mutations/create-section";
import { FormSection } from "@/lib/types/forms";
import {
  createContext,
  ReactNode,
  startTransition,
  use,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface SectionsContextValue {
  formId: string;
  sections: FormSection[];
  appendSection: (title: string) => void;
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

  const appendSection = useCallback(
    async (title: string) => {
      const sectionId = uuidv4();

      startTransition(() => {
        updateOptimisticSections({
          type: "APPEND_SECTION",
          payload: {
            sectionId,
            title,
            formId,
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

  const value = useMemo(() => {
    return {
      formId,
      sections: optimisticSections,
      appendSection,
    };
  }, [formId, optimisticSections, appendSection]);

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
