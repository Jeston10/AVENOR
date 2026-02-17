export default function HeroGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-1/2 h-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-40" />
    </div>
  )
}
