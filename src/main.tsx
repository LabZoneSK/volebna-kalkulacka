import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as Sentry from '@sentry/react'

Sentry.init({
    dsn: 'https://7f554e5a040d59522dd7d5456c5ce398@o1160910.ingest.sentry.io/4505811594772480',
    integrations: [
        new Sentry.BrowserTracing({
            tracePropagationTargets: [
                /^https:\/\/flourishing-cocada-5a0e8c\.netlify\.app/,
            ],
        }),
        new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
})

const rootElement = document.getElementById('root')
if (rootElement) {
    const root = createRoot(rootElement)
    root.render(
        (
            <StrictMode>{(<App />) as React.ReactElement}</StrictMode>
        ) as React.ReactElement
    )
} else {
    console.error('Could not find root element')
}
