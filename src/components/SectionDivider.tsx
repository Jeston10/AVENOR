/** Glowing blue section divider — thin line, brighter at center, fades toward edges */
export default function SectionDivider() {
  return (
    <div
      className="w-full h-px my-0"
      role="presentation"
      aria-hidden
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 20%, rgba(59, 130, 246, 0.8) 50%, rgba(59, 130, 246, 0.2) 80%, transparent 100%)',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.25)',
      }}
    />
  )
}
