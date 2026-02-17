import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  onError?: (error: Error) => void
  fallback?: ReactNode
}

type State = { hasError: boolean; error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return (
        <section className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h2 className="font-display font-bold text-xl text-white mb-2">Something went wrong</h2>
            <p className="text-[var(--color-muted)] text-sm mb-6">
              We’ve been notified. Please try refreshing the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity"
            >
              Refresh page
            </button>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
