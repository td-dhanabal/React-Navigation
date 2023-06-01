import React, { useEffect, useState } from 'react';
import { getRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { Col, Divider, Row, Avatar, Button, Popover } from 'antd';
import { BrowserRouter as Router, useParams, Route, Routes, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import { useMemo } from "react";
import Post from '../post';
import Gallery from '../gallery';
import Todo from '../todo';
import Homeprofile from './homeProfile';
import './index.scss';
import 'leaflet/dist/leaflet.css';

const Profile = () => {
    let params = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, [params.id]);
    const getAllUsers = async () => {
        try {
            const userResponse = await getRequest(serviceApi.allUsers(state))
            if (userResponse) {
                console.log('hh', userResponse.data.users);
                setAllUsers(userResponse.data.users);
                let userId = parseInt(params.id);
                console.log('userId', userId);
                let userData = userResponse.data.users.filter(word => word.id === userId);
                console.log('userData', userData);
                setUsers(userData)
            }
        } catch (error) {

        }
    };
    const userClick = (id) => {
        navigate(`/${id}/profile`, { state: id });
        getAllUsers();
    }
    const content = (
        <div>
            <div className='profile-menu'>
                <Avatar size={64} src={users[0]?.profilepicture} />
                <p>{users[0]?.name}</p>
                <p>{users[0]?.email}</p>
            </div>
            <div className='user-list-body'>
                {allUsers.map((allUser, i) => (
                    <>
                        <Divider />
                        <div className='users-list'>
                            <Avatar src={allUser?.profilepicture} />
                            <p onClick={() => { userClick(allUser.id) }}>{allUser?.name}</p>
                        </div>

                    </>
                ))}
            </div>
            <div className='text-center'>
                <Button onClick={() => { navigate('/') }} className='sign-out-btn'>Sign out</Button>
            </div>
        </div>
    );
    // const position = [users[0].address.geo.lat, users[0].address.geo.lng]
    return (
        <div>
            {console.log('users', users)}
            <Row gutter={16} style={{ margin: 0 }}>
                <Col className="gutter-row menuBody" span={5} >
                    <ul>
                        <li> <Link to={`/${params.id}/profile`}>Profile</Link></li>
                        <li><Link to={`/${params.id}/post`}>Post</Link></li>
                        <li><Link to={`/${params.id}/gallery`}>Gallery</Link></li>
                    </ul>
                </Col>
                <Col className="gutter-row parent-body" span={19}>
                    {console.log('vv', params.id)}
                    <Outlet />
                    {users.map((user, i) => (
                        <>
                            <Row key={i} className='pageContent' gutter={16} style={{ margin: 0 }}>
                                <Col className="gutter-row " span={12} >
                                    <h3>Profile</h3>
                                </Col>
                                <Col className="gutter-row text-right" span={12} >
                                    <Popover style={{ width: '200px' }} placement="bottom" content={content} trigger="click">
                                        <Avatar src={user.profilepicture} />
                                        <label className='ml-10 cursor'>{user.name}</label>
                                    </Popover>

                                </Col>
                                <Divider />
                            </Row>


                            <Row className='page-body' gutter={16} style={{ margin: 0 }}>
                                <Col className="gutter-row left-content" span={10} >
                                    <div className='img-body'>
                                        <img src={user.profilepicture} alt='' />
                                    </div>
                                    <div className='text-center '>
                                        <h4>{user.name}</h4>
                                    </div>
                                    <div className='info-body'>
                                        <label>Username : </label>
                                        <label>&nbsp;{user.username}</label>
                                    </div>
                                    <div className='info-body'>
                                        <label>Email : </label>
                                        <label>&nbsp;{user.email}</label>
                                    </div>
                                    <div className='info-body'>
                                        <label>Phone : </label>
                                        <label>&nbsp;{user.phone}</label>
                                    </div>
                                    <div className='info-body'>
                                        <label>Website : </label>
                                        <label>&nbsp;{user.website}</label>
                                    </div>
                                    <Divider />
                                    <p>Company</p>
                                    <div className='info-body'>
                                        <label>Name : </label>
                                        <label>&nbsp;{user.company.name}</label>
                                    </div>
                                    <div className='info-body'>
                                        <label>catchpharse : </label>
                                        <label>&nbsp;{user.company.catchPhrase}</label>
                                    </div>
                                    <div className='info-body'>
                                        <label>bs : </label>
                                        <label>&nbsp;{user.company.bs}</label>
                                    </div>
                                </Col>

                                <Col className="gutter-row right-content" span={14} >
                                    <div className='addrress-body'>
                                        <div className=' '>
                                            <p>Address</p>
                                        </div>
                                        <div className='info-body'>
                                            <label>Street : </label>
                                            <label>&nbsp;{user.address.street}</label>
                                        </div>
                                        <div className='info-body'>
                                            <label>Suite : </label>
                                            <label>&nbsp;{user.address.suite}</label>
                                        </div>
                                        <div className='info-body'>
                                            <label>City : </label>
                                            <label>&nbsp;{user.address.city}</label>
                                        </div>
                                        <div className='info-body'>
                                            <label>Zipcode : </label>
                                            <label>&nbsp;{user.address.zipcode}</label>
                                        </div>
                                    </div>
                                    <div className='map-body'>
                                        {console.log('dd', user.address.geo.lat)}
                                        <MapContainer center={[user.address.geo.lat, user.address.geo.lat]} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100wh' }}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />

                                        </MapContainer>
                                    </div>
                                </Col>

                            </Row>

                        </>
                    ))}
                    {/* <Routes>
                        <Route exact path={`/${params.id}/profile`} Component={Homeprofile} />
                        <Route path={`/${params.id}/post`} Component={Post} />
                        <Route path={`/${params.id}/gallery`} Component={Gallery} />
                    </Routes> */}
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
