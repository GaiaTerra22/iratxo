export default function Placeholder({
  label = "Foto",
  ratio = "aspect-[4/5]",
  className = "",
}: {
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`${ratio} ${className} flex items-center justify-center rounded-sm border border-white/10 bg-gradient-to-br from-surface to-black text-xs uppercase tracking-[0.2em] text-muted`}
    >
      {label}
    </div>
  );
}