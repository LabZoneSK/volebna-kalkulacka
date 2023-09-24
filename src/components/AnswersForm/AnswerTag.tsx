import { FC, lazy } from 'react'
import classNames from 'classnames'

import { getResponseText } from '../../helpers/answers'
import { Answer } from '../../@types'

const Tooltip = lazy(
    () => import('@material-tailwind/react/components/Tooltip')
)
interface AnswerTagProps {
    answer: number
    currentParty?: Answer
}

const AnswerTag: FC<AnswerTagProps> = ({ answer, currentParty }) => {
    const TagClass = classNames(
        'flex gap-20 items-center justify-center rounded-full py-10 text-center font-bold font-poppins w-[90px]',
        {
            'bg-magenta text-white': answer === 1,
            'bg-z-blue text-white': answer === -1,
        }
    )

    if (!currentParty?.explanation)
        return (
            <div className={TagClass}>
                <span className="select-none text-left font-poppins text-18">
                    {getResponseText(answer)}
                </span>
            </div>
        )

    return (
        <Tooltip
            content={
                currentParty?.explanation ? (
                    <p className="font-poppins">{currentParty?.explanation}</p>
                ) : null
            }
            placement="bottom"
            className={classNames('w-[320px] bg-white p-3 text-black shadow', {
                'bg-[#DCE5FF]': currentParty?.answer_value === -1,
                'bg-[#F1DEE9]': currentParty?.answer_value === 1,
            })}
        >
            <div className={TagClass}>
                <span className="select-none text-left font-poppins text-18">
                    {getResponseText(answer)}
                </span>
            </div>
        </Tooltip>
    )
}

export default AnswerTag
