import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";

export default function ChangeBlock() {
  const { block } = useBlockContext();

  return (
    <div className="border-1 border-zinc-200">
      <p>{block.blockType}</p>
    </div>
  );
}
