import React, { useEffect } from 'react';
import Goal from './Goal';
import axios from 'axios';

const Dashboard = () => {
    const [goals, setGoals] = useState({
        goals: []
    });

    // Component Did Mount LifeCycle Method Replica
    useEffect(() => {
        store.dispatch(loadUser);
        axios.get('api/items/myitems')
            .then(res => setGoals(res.data))
            .catch(err => setError(err));
        console.log.()
    }, []);


    return (
        <div>

        </div>
    );
};

export default Dashboard;