import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { FormBlock } from "@/lib/types/forms";
import { createContext, useContext, useMemo, useState } from "react";

interface BlockContextValue {
  block: FormBlock;
  index: number;

  mutationCallback: (() => Promise<void>) | undefined;
  setMutationCallback: React.Dispatch<
    React.SetStateAction<(() => Promise<void>) | undefined>
  >;
}

const BlockContext = createContext<BlockContextValue | undefined>(undefined);

type Props = {
  block: FormBlock;
  index: number;
  children: React.ReactNode;
};

export const BlockProvider = ({ block, index, children }: Props) => {
  const { sections } = useSectionsContext();

  const [mutationCallback, setMutationCallback] = useState<
    (() => Promise<void>) | undefined
  >(undefined);

  const value = useMemo(
    () => ({
      block,
      index,
      mutationCallback,
      setMutationCallback,
    }),
    [block, index, mutationCallback],
  );

  return (
    <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
  );
};

export const useBlockContext = () => {
  const context = useContext(BlockContext);

  if (context === undefined) {
    throw new Error("useBlocksContext must be used within a BlocksProvider");
  }

  return context;
};
