import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";

export default function ChangeBlock() {
  const { blockDraft } = useBlockContext();

  return (
    <div className="border-1 border-zinc-200">
      <p>{blockDraft.blockType}</p>
    </div>
  );
}
