import React from 'react'
import './CrossBtn.css'

const CrossBtn = ({ onClick }) => {
    return (
        <div onClick={() => onClick()} className="btn-delete">
            <i class="fa fa-close"></i>
        </div>
    )
}

export default CrossBtn