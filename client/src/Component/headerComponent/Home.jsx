import React, { useEffect, useState } from 'react'
import User from '../user/User';
import Login from './Login';
import axios from 'axios';
import Admin from '../admin/Admin';

function Home() {
    const [auth, setAuth] = useState(false);
    const [roleId, setRoleId] = useState('');

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/v1/users/${userId}`)
    //         .then(res => console.log(res))
    //         .catch(err => console.error(err))
    // }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/users/user/login')
            .then(res => {
                if (res.data.status === 200) {
                    setRoleId(res.data.data.roleId);
                }
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <div>
            <User />
            {/* {roleId == 0 ? <Admin /> : <User />} */}
        </div>
    )
}

export default Home