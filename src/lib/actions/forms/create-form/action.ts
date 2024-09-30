"use server";

import { db } from "@/db";
import { forms } from "@/db/schema";
import {
  createFormSchema,
  CreateFormState,
} from "@/lib/actions/forms/create-form/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { getWorkspaceFormsCount } from "@/lib/queries/forms";
import {
  checkIfUserOwnsWorkspaceFolder,
  getWorkspaceIdByFolderId,
} from "@/lib/queries/workspaces";
import { redirect } from "next/navigation";

const MAX_FORMS_QTY = 10;

export default async function createForm(
  _: CreateFormState,
  formData: FormData,
): Promise<CreateFormState> {
  console.log(formData);

  const parsed = createFormSchema.safeParse({
    "folder-id": formData.get("folder-id"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { "folder-id": folderId, name } = parsed.data;

  const { user } = await validateUser();

  if (!checkIfUserOwnsWorkspaceFolder(user, folderId)) {
    return {
      error: "Unauthorized",
    };
  }

  // Get workspace id through folder id to prevent against client-side
  // form injection and to keep logic simple
  const workspaceId = await getWorkspaceIdByFolderId(folderId);

  const formsCount = await getWorkspaceFormsCount(workspaceId);

  if (formsCount >= MAX_FORMS_QTY) {
    return {
      error: `Maximum number of forms (${MAX_FORMS_QTY}) reached in workspace.`,
    };
  }

  const [{ id: formId }] = await db
    .insert(forms)
    .values({
      title: name,
      workspaceFolderId: folderId,
    })
    .returning({ id: forms.id });

  redirect(`/edit/${formId}`);
}
