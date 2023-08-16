import React from 'react'
import classNames from 'classnames'
import { ReactComponent as Chevron } from '../../assets/chevron.svg'
import { ButtonType } from '../../@types'
interface ButtonProps {
    handleClick: () => void
    label: string
    type?: ButtonType
    color?: string
    icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
    handleClick,
    label,
    type = ButtonType.PRIMARY,
    color = 'magenta',
    icon = <Chevron className="text-white" />,
}) => {
    const ButtonClass = classNames(
        'rounded-full px-30 py-20 font-poppins font-bold',
        {
            [`bg-${color} text-white`]: type === ButtonType.PRIMARY,
            [`border-2 border-${color}`]: type === ButtonType.SECONDARY,
        }
    )

    return (
        <button className={ButtonClass} onClick={handleClick}>
            <div className="flex flex-row items-center gap-50">
                <span className="text-lg">{label}</span>
                <span className={`text-${color}`}>{icon}</span>
            </div>
        </button>
    )
}

export default Button
