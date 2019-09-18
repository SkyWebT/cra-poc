import React, { useEffect } from 'react';

import history from '../history';
import Auth from '../stores/auth';

const Logout = ()=>{

    useEffect(()=>{
        Auth.reset();
        history.push('/')
    },[])
    return <div>
        Logout

    </div>
}

export default Logout