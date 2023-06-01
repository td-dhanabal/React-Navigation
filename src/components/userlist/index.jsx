import React, { useEffect, useState } from 'react';
import { Card, Space, Spin } from 'antd';
import { getRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { Avatar, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss'

const Userlist = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, []);
    const getAllUsers = async () => {
        setLoading(true);
        try {
            const userResponse = await getRequest(serviceApi.allUsers())
            if (userResponse) {
                setLoading(false);
                setUsers(userResponse.data.users);
            }
        } catch (error) {

        }
    }
    if (loading) {
        return (
          <div className="data-loader">
            <Spin className="spin" tip="Loading" size="large" />
          </div>
        );
      }
    

    return (
        <div className='landingPage'>
            {console.log('users', users)}
            <Space direction="vertical" size={16}>
                <Card className=''
                    title="Select an account"
                    style={{
                        width: 500,
                        boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        marginTop: '25%'
                    }}
                >
                    {users.map((user, i) => (
                        <>
                            <div key={i} className='listItem'>
                                <Avatar src={user.profilepicture} />
                                <p onClick={() => { navigate(`/${user.id}/profile`, { state: user.id }) }}>{user.name}</p>
                            </div>
                            <Divider />
                        </>
                    ))}
                </Card>

            </Space>

        </div>
    );
}

export default Userlist;
