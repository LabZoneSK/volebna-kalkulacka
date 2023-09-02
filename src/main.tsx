import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
//...
import * as Sentry from '@sentry/react'

Sentry.init({
    dsn: 'https://7f554e5a040d59522dd7d5456c5ce398@o1160910.ingest.sentry.io/4505811594772480',
    integrations: [
        new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: [
                'localhost',
                /^https:\/\/flourishing-cocada-5a0e8c\.netlify\.app/,
            ],
        }),
        new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
