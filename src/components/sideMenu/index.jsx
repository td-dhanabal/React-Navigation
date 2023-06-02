import React from 'react';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';
import './index.scss';

const SideMenu = () => {
    let params = useParams();
    return (
        <div>
            <ul>
                <li> <Link to={`/${params.id}/profile`}>Profile</Link></li>
                <li><Link to={`/${params.id}/post`}>Post</Link></li>
                <li><Link to={`/${params.id}/gallery`}>Gallery</Link></li>
                <li><Link to={`/${params.id}/todo`}>ToDO</Link></li>
            </ul>
        </div>
    );
}

export default SideMenu;
