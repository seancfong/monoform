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

export interface MutationRef {
  invokeSave: (formId: string) => Promise<void>;
}

interface BlockContextValue {
  /** Value that reflects the current database state */
  optimisticBlock: BlockVariantUnion;

  /** Value that reflects the current client-side draft and needs to be synced with its optimistic value */
  blockDraft: BlockVariantUnion;
  setBlockDraft: Dispatch<SetStateAction<BlockVariantUnion>>;

  blockIndex: number;

  saveCallback: () => void;
  mutationRef: RefObject<MutationRef>;

  isStale: boolean;
  setIsStale: Dispatch<SetStateAction<boolean>>;

  deleteCurrentBlock: () => void;
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
  const {
    focusedBlockId,
    setFocusedBlockId,
    mutateBlock,
    deleteBlock,
    formId,
  } = useSectionsContext();
  const [blockDraft, setBlockDraft] =
    useState<BlockVariantUnion>(optimisticBlock);
  const mutationRef = useRef<MutationRef>(null);
  const [isStale, setIsStale] = useState(false);

  // In the background, sync the block draft with the optimistic block on revalidation
  useEffect(() => {
    if (optimisticBlock.id !== focusedBlockId) {
      setBlockDraft(optimisticBlock);
    }
  }, [blockDraft.id, focusedBlockId, optimisticBlock]);

  const saveCallback = useCallback(() => {
    saveAttempt: try {
      if (!isStale) {
        break saveAttempt;
      }

      setIsStale(false);

      mutateBlock(sectionIndex, blockDraft, async () => {
        if (!mutationRef.current) {
          throw new Error(
            "`mutationRef` is not initialized, cannot save this block entry.",
          );
        }

        await mutationRef.current.invokeSave(formId);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFocusedBlockId(undefined);
    }
  }, [
    blockDraft,
    formId,
    isStale,
    mutateBlock,
    sectionIndex,
    setFocusedBlockId,
  ]);

  const deleteCurrentBlock = useCallback(() => {
    deleteBlock(sectionIndex, blockDraft);
  }, [blockDraft, deleteBlock, sectionIndex]);

  const value = useMemo(
    () => ({
      optimisticBlock,
      blockDraft,
      setBlockDraft,
      blockIndex,
      saveCallback,
      mutationRef,
      isStale,
      setIsStale,
      deleteCurrentBlock,
    }),
    [
      optimisticBlock,
      blockDraft,
      blockIndex,
      saveCallback,
      isStale,
      deleteCurrentBlock,
    ],
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
