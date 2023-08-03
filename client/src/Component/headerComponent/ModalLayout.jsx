import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import FormUpdateInfo from '../user/FormUpdateInfo'

export default function ({ isToggleModal, setIsToggleModal, isAccount, setIsAccount }) {

    return (
        <div class="modal_contaier">
            <div class="modal__overlay"></div>
            <div class="modal__body">
                <FormUpdateInfo />
            </div>
        </div>
    )
}
