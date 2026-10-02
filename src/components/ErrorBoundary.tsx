import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Kamus Ceria AI ErrorBoundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-amber-50/80 flex items-center justify-center p-4 text-center font-['Quicksand',sans-serif]">
          <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-8 max-w-md w-full">
            <div className="text-7xl mb-4 animate-bounce">🦉</div>
            
            <h1 className="text-3xl font-black font-['Fredoka',sans-serif] text-slate-900 mb-2">
              OOPS!
            </h1>
            
            <p className="text-base font-bold text-amber-900 mb-6 leading-relaxed">
              “Cikgu Ceri sedang cuba membaiki sesuatu. Cuba muat semula halaman.”
            </p>

            <button
              onClick={this.handleReset}
              className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white font-black text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka',sans-serif]"
            >
              🔄 Cuba Lagi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
