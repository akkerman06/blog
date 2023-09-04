import React from "react";
import cls from "./card.module.scss"

const Card = ({children, className}) => {
    return <div className={`${cls.card} ${className}`}>
            {children}   
          </div>;
}
export default Card