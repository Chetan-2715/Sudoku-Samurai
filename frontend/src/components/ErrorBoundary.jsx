import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
                    <div className="max-w-md w-full bg-zinc-900 border border-red-500/50 rounded-lg p-6 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4 text-red-500">
                            <AlertTriangle className="h-8 w-8" />
                            <h1 className="text-2xl font-bold">Something went wrong</h1>
                        </div>
                        <p className="text-zinc-300 mb-4">
                            The application encountered a critical error and could not load.
                        </p>
                        <div className="bg-black/50 p-4 rounded border border-zinc-800 overflow-auto max-h-48 mb-6">
                            <code className="text-red-400 text-sm font-mono break-all">
                                {this.state.error && this.state.error.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
