import Responses from "@/app/(forms)/console/[id]/responses/components/responses/responses";
import { validateUser } from "@/lib/auth/validate-user";
import { userOwnsForm } from "@/lib/queries/forms";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: { id: string };
};

export default async function ResponsesPage({ params }: Props) {
  const { id: formId } = params;

  const { user } = await validateUser();

  const [ownsForm] = await userOwnsForm.execute({
    formId,
    userId: user.id,
  });

  if (!ownsForm) {
    notFound();
  }

  return (
    <Suspense fallback={<></>}>
      <Responses formId={formId} />
    </Suspense>
  );
}
