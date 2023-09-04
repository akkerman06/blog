import React from "react"
import cls from "./input.module.scss"

const Input = ({type, placeholder,value, className, big , onChange}) => {
    return(
        <input onChange={onChange} type={type} placeholder={placeholder} value={value} className={` ${cls.input} ${big && cls.big}`}/>
    )
}

export default Input 