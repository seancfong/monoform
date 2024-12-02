"use server";

import { db } from "@/db";
import { sections } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { userOwnsSection } from "@/lib/queries/forms";
import { FormSection } from "@/lib/types/forms";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteSection(
  formId: string,
  section: FormSection,
) {
  const { user } = await validateUser();

  // I. Check if user owns section
  // TODO: use unstable cache
  const [ownedSection] = await userOwnsSection.execute({
    sectionId: section.id,
    formId: formId,
    userId: user.id,
  });

  if (!ownedSection) {
    return;
  }

  await db.delete(sections).where(eq(sections.id, section.id));

  revalidatePath(`/console/${formId}`);
  revalidatePath(`/fill/${formId}`);
}
