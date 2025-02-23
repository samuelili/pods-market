import { Component, ReactNode } from 'react';

class ErrorBoundary extends Component<{
  children: ReactNode;
  fallback: ReactNode;
}> {
  state = {
    hasError: false,
  };

  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
