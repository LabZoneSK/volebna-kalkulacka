import React from 'react'

import StepWrapper from './AppSteps/StepWrapper'

import UserAnswers from './AnswersForm/AnswersForm'
import useFetchQuestions from '../data/useFetchQuestions'
import useFetchAnswers from '../data/useFetchAnswers'

const Calculator: React.FC = () => {
    const { loading, questions } = useFetchQuestions()
    const { parties } = useFetchAnswers()

    return (
        <StepWrapper>
            {loading ? (
                <p>Prosím, čakaj kým načítame otázky.</p>
            ) : (
                <UserAnswers questions={questions} politicalParties={parties} />
            )}
        </StepWrapper>
    )
}

export default Calculator
