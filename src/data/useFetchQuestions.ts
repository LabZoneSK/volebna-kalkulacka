import { useState, useEffect } from 'react'

import { useAtom, useSetAtom } from 'jotai'
import {
    questionsAtom,
    answersAtom,
} from '../components/AnswersForm/answers.form.atoms'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import * as Sentry from '@sentry/react'

const useFetchQuestions = () => {
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useAtom(questionsAtom)
    const setAnswers = useSetAtom(answersAtom)

    useEffect(() => {
        const controller = new AbortController()
        const fetchQuestions = async () => {
            try {
                axiosRetry(axios, {
                    retries: 3,
                    retryDelay: (...arg) =>
                        axiosRetry.exponentialDelay(...arg, 1000),
                })
                const result = await axios.get(
                    'https://zmudri.labzone.tech/questions',
                    { signal: controller.signal }
                )

                setQuestions(result.data)
                setAnswers(new Array(result.data?.length).fill(0))
            } catch (error) {
                Sentry.captureException(error)
            } finally {
                setLoading(false)
            }
        }

        fetchQuestions()
    }, [setAnswers, setQuestions])

    return { loading, questions }
}

export default useFetchQuestions
