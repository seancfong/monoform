import Responses from "@/app/(forms)/console/[id]/responses/components/responses/responses";
import React from "react";

type Props = {
  params: { id: string };
};

export default function ResponsesPage({ params }: Props) {
  const { id: formId } = params;

  return (
    <div>
      <Responses formId={formId} />
    </div>
  );
}
