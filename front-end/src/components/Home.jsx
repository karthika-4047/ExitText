import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Home = () => {
   

 

    return (
        <div className="main">
            <div className="main-content">
                <h1>Welcome to Todo Dashboard</h1>
                <p>Your ultimate solution to manage tasks efficiently and effectively.</p>
                <button >
                    <Link to='/dash' className='link' >Go to Todo List</Link>
                    </button>
            </div>
        </div>
    );
};

export default Home;
