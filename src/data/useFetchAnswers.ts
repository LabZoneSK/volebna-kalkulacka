import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { partiesAtom } from '../components/AnswersForm/answers.form.atoms'
import axios from 'axios'

const useFetchAnswers = () => {
    const [parties, setParties] = useAtom(partiesAtom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnswers = async () => {
            const answers = await axios.get(
                'https://zmudri.labzone.tech/answers'
            )
            setLoading(false)
            setParties(answers.data)
        }

        fetchAnswers()
    }, [setParties])

    return { loading, parties }
}

export default useFetchAnswers
