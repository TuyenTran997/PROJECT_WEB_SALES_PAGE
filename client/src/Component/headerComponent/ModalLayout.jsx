import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

export default function ({ isToggleModal, setIsToggleModal, isAccount, setIsAccount }) {

    return (
        <div class="modal_contaier">
            <div class="modal__overlay"></div>
            <div class="modal__body">
                {isAccount ?
                    <Register isAccount={isAccount} setIsAccount={setIsAccount} />
                    :
                    <Login isToggleModal={isToggleModal} setIsToggleModal={setIsToggleModal} isAccount={isAccount} setIsAccount={setIsAccount} />
                }
            </div>
        </div>
    )
}
