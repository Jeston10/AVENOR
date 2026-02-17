import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ToastItem = { id: number; message: string; type: 'error' | 'success' | 'info' }

const ToastContext = createContext<((message: string, type?: ToastItem['type']) => void) | null>(null)

export function useToast() {
  const add = useContext(ToastContext)
  if (!add) throw new Error('useToast must be used within ToastProvider')
  return add
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [nextId, setNextId] = useState(0)

  const addToast = useCallback((message: string, type: ToastItem['type'] = 'error') => {
    const id = nextId
    setNextId((n) => n + 1)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [nextId])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div
        className="fixed left-4 right-4 top-4 z-[9999] flex flex-col gap-2 md:left-auto md:right-4 md:top-auto md:bottom-4 md:max-w-sm"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`
                rounded-xl border px-4 py-3 text-sm font-medium shadow-lg
                ${t.type === 'error' ? 'border-red-500/50 bg-red-950/95 text-red-100' : ''}
                ${t.type === 'success' ? 'border-emerald-500/50 bg-emerald-950/95 text-emerald-100' : ''}
                ${t.type === 'info' ? 'border-[var(--color-primary)]/50 bg-[var(--color-bg-elevated)] text-[var(--color-text)]' : ''}
              `}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
