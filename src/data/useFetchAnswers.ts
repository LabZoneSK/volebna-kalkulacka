import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { partiesAtom } from '../components/AnswersForm/answers.form.atoms'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import * as Sentry from '@sentry/react'

const useFetchAnswers = () => {
    const [parties, setParties] = useAtom(partiesAtom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        const fetchAnswers = async () => {
            try {
                axiosRetry(axios, {
                    retries: 3,
                    retryDelay: (...arg) =>
                        axiosRetry.exponentialDelay(...arg, 1000),
                })
                const answers = await axios.get(
                    'https://zmudri.labzone.tech/answers',
                    { signal: controller.signal }
                )
                setParties(answers.data)
            } catch (err) {
                Sentry.captureException(err)
            } finally {
                setLoading(false)
            }
        }

        fetchAnswers()
    }, [setParties])

    return { loading, parties }
}

export default useFetchAnswers
