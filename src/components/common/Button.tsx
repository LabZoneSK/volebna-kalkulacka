import React from 'react'
import Chevron from '../../assets/chevron.svg'
interface ButtonProps {
    handleClick: () => void
    label: string
}

const Button: React.FC<ButtonProps> = ({ handleClick, label }) => {
    return (
        <button
            className="rounded-full bg-magenta px-30 py-20 font-poppins font-bold text-white"
            onClick={handleClick}
        >
            <div className="flex gap-50">
                <span className="text-lg">{label}</span>
                <img src={Chevron} alt="chevron" />
            </div>
        </button>
    )
}

export default Button
