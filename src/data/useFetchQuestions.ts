import { useState, useEffect } from 'react'

import { useAtom, useSetAtom } from 'jotai'
import {
    questionsAtom,
    answersAtom,
} from '../components/AnswersForm/answers.form.atoms'
import axios from 'axios'

const useFetchQuestions = () => {
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useAtom(questionsAtom)
    const setAnswers = useSetAtom(answersAtom)

    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await axios.get(
                'https://zmudri.labzone.tech/questions'
            )

            setQuestions(result.data)
            setAnswers(new Array(result.data?.length).fill(0))
            setLoading(false)
        }

        fetchQuestions()
    }, [setAnswers, setQuestions])

    return { loading, questions }
}

export default useFetchQuestions
