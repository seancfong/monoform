import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { BlockVariantUnion } from "@/lib/types/forms";
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface BlockRef {
  invokeSave: (sectionIndex: number, blockIndex: number) => void;
}

interface BlockContextValue {
  /** Value that reflects the current database state */
  optimisticBlock: BlockVariantUnion;

  /** Value that reflects the current client-side draft and needs to be synced with its optimistic value */
  blockDraft: BlockVariantUnion;
  setBlockDraft: Dispatch<SetStateAction<BlockVariantUnion>>;

  blockIndex: number;

  saveCallback: () => void;
  blockRef: RefObject<BlockRef>;

  isStale: boolean;
  setIsStale: Dispatch<SetStateAction<boolean>>;
}

const BlockContext = createContext<BlockContextValue | undefined>(undefined);

type Props = {
  sectionIndex: number;
  blockIndex: number;
  optimisticBlock: BlockVariantUnion;
  children: React.ReactNode;
};

export const BlockProvider = ({
  sectionIndex,
  blockIndex,
  optimisticBlock,
  children,
}: Props) => {
  const { setFocusedBlockId } = useSectionsContext();
  const [blockDraft, setBlockDraft] =
    useState<BlockVariantUnion>(optimisticBlock);
  const blockRef = useRef<BlockRef>(null);
  const [isStale, setIsStale] = useState(false);

  // Sync the block draft with the optimistic block on revalidation
  useEffect(() => {
    setBlockDraft(optimisticBlock);
  }, [optimisticBlock]);

  const saveCallback = useCallback(() => {
    saveAttempt: try {
      if (!isStale) {
        break saveAttempt;
      }

      setIsStale(false);

      if (!blockRef.current) {
        throw new Error(
          "`blockRef` is not initialized, cannot save this block entry.",
        );
      }

      blockRef.current.invokeSave(sectionIndex, blockIndex);
    } catch (error) {
      console.error(error);
    } finally {
      setFocusedBlockId(undefined);
    }
  }, [blockIndex, isStale, sectionIndex, setFocusedBlockId]);

  const value = useMemo(
    () => ({
      optimisticBlock,
      blockDraft,
      setBlockDraft,
      blockIndex,
      saveCallback,
      blockRef,
      isStale,
      setIsStale,
    }),
    [optimisticBlock, blockDraft, blockIndex, saveCallback, isStale],
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
