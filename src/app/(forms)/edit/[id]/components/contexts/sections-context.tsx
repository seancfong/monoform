"use client";

import { sectionsReducer } from "@/app/(forms)/edit/[id]/components/contexts/sections-reducer";
import { SelectSections } from "@/db/schema";
import createSection from "@/lib/actions/forms/mutations/create-section";
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
  sections: SelectSections[];
  addSection: (title: string) => void;
}

const SectionsContext = createContext<SectionsContextValue | undefined>(
  undefined,
);

type SectionsProviderProps = {
  children: ReactNode;
  formId: string;
  sectionsPromise: Promise<SelectSections[]>;
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

  const addSection = useCallback(
    async (title: string) => {
      const sectionId = uuidv4();

      startTransition(() => {
        updateOptimisticSections({
          type: "ADD_SECTION",
          payload: {
            sectionId,
            title,
          },
        });
      });

      // TODO: call server action
      await createSection({ formId });
    },
    [formId, updateOptimisticSections],
  );

  const value = useMemo(() => {
    return {
      sections: optimisticSections,
      addSection,
    };
  }, [optimisticSections, addSection]);

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
