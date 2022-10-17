import React, { useState, useEffect } from "react";
import "../assets/css/ItemCount.css"

export const ItemCount = ( {initial, stock, onAdd} ) => {

    const [count, setCount] = useState(parseInt(initial))

    const decrease = () => {
        setCount(count - 1);
    }
    const increase = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        setCount(parseInt(initial));
    }, [initial])

    return(
        <div className="containerCounter">
            <button className="btn btn-outline-dark" disabled={count <= 1} onClick={decrease}>-</button>
            <span>{count}</span>
            <button className="btn btn-outline-dark" disabled={count >= stock} onClick={increase}>+</button>
            <div>
                <button className="btn btn-outline-dark" disabled={stock <= 0} onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
        </div>
    );
}