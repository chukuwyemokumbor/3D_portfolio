import { Component, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

/** Shows the fallback instead of a blank screen if the 3D scene throws (e.g. WebGL context creation fails). */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error('3D scene failed to render:', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
