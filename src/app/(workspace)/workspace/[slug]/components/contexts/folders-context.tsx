"use client";

import { foldersReducer } from "@/app/(workspace)/workspace/[slug]/components/contexts/folders-reducer";
import createFolder from "@/lib/actions/workspaces/create-folder/action";
import { UserWorkspace, UserWorkspaceFolder } from "@/lib/queries/workspaces";
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

interface FoldersContextValue {
  folders: UserWorkspaceFolder[] | undefined;
  addFolder: (title: string) => Promise<void>;
  removeFolder: (folderId: string) => Promise<void>;
  updateFolder: (folderId: string, title: string) => Promise<void>;
}

const FoldersContext = createContext<FoldersContextValue | undefined>(
  undefined,
);

type FoldersProviderProps = {
  children: ReactNode;
  foldersPromise: Promise<UserWorkspaceFolder[]>;
  workspace: UserWorkspace;
};

export const FoldersProvider = ({
  children,
  foldersPromise,
  workspace,
}: FoldersProviderProps) => {
  const initialFolders = use(foldersPromise);
  const [optimisticFolders, updateOptimisticFolders] = useOptimistic(
    initialFolders,
    foldersReducer,
  );

  const addFolder = useCallback(
    async (title: string) => {
      const folderId = uuidv4();

      startTransition(() => {
        updateOptimisticFolders({
          type: "ADD_FOLDER",
          payload: {
            folderId,
            title,
          },
        });
      });

      await createFolder(folderId, title, workspace);
    },
    [updateOptimisticFolders, workspace],
  );

  const removeFolder = useCallback(
    async (folderId: string) => {
      startTransition(() => {
        updateOptimisticFolders({
          type: "REMOVE_FOLDER",
          payload: {
            folderId,
          },
        });
      });

      // TODO: await remove folder action
    },
    [updateOptimisticFolders],
  );

  const updateFolder = useCallback(
    async (folderId: string, title: string) => {
      updateOptimisticFolders({
        type: "UPDATE_FOLDER",
        payload: {
          folderId,
          title,
        },
      });

      // TODO: await update folder action
    },
    [updateOptimisticFolders],
  );

  const value = useMemo(() => {
    return {
      folders: optimisticFolders,
      addFolder,
      removeFolder,
      updateFolder,
    };
  }, [addFolder, optimisticFolders, removeFolder, updateFolder]);

  return (
    <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>
  );
};

export const useFoldersContext = (): FoldersContextValue => {
  const context = useContext(FoldersContext);

  if (context === undefined) {
    throw new Error("useFoldersContext must be used within a SidebarProvider");
  }

  return context;
};
