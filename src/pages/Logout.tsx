import React, { useEffect } from 'react';

import Auth from '../auth';
import history from '../history';

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