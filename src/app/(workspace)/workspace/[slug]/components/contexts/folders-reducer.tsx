import { UserWorkspaceFolder } from "@/lib/queries/workspaces";

type FoldersAction = AddFolderAction | RemoveFolderAction | UpdateFolderAction;

export function foldersReducer(
  state: UserWorkspaceFolder[] | undefined,
  action: FoldersAction,
): UserWorkspaceFolder[] {
  const currentFolderState = state || [];

  switch (action.type) {
    case "REMOVE_FOLDER": {
      const { folderId } = action.payload;

      return currentFolderState.filter((folder) => folder.id !== folderId);
    }
    case "ADD_FOLDER": {
      const { folderId, title } = action.payload;
      const newFolder = {
        id: folderId,
        title,
      };

      return [...currentFolderState, newFolder];
    }
    case "UPDATE_FOLDER": {
      const { folderId, title } = action.payload;
      const index = currentFolderState.findIndex(
        (folder) => folder.id === folderId,
      );

      if (index !== -1) {
        currentFolderState[index] = {
          ...currentFolderState[index],
          title,
        };
      }

      return currentFolderState;
    }
    default:
      return currentFolderState;
  }
}

type AddFolderAction = {
  type: "ADD_FOLDER";
  payload: {
    folderId: string;
    title: string;
  };
};

type RemoveFolderAction = {
  type: "REMOVE_FOLDER";
  payload: {
    folderId: string;
  };
};

type UpdateFolderAction = {
  type: "UPDATE_FOLDER";
  payload: {
    folderId: string;
    title: string;
  };
};
