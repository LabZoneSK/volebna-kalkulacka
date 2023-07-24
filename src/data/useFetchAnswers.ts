import { useState, useEffect } from 'react'
import { fetchAirtable } from './fetchAirtable'
import { transformResponseToPoliticalParties } from '../helpers/transformers'
import { useAtom } from 'jotai'
import { partiesAtom } from '../components/AnswersForm/answers.form.atoms'

const useFetchAnswers = () => {
    const [parties, setParties] = useAtom(partiesAtom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnswers = async () => {
            // Use only the path to the API endpoint
            const result = await fetchAirtable(
                'tblZ2ct746fdfB39Z?view=viwiYe2EgZLwhKsbX'
            )
            // Transform the response to the desired format
            const transformedResult =
                transformResponseToPoliticalParties(result)

            setParties(transformedResult)
            setLoading(false)
        }

        fetchAnswers()
    }, [])

    return { loading, parties }
}

export default useFetchAnswers
