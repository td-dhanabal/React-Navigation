import React, { useEffect, useState } from 'react';
import { Card, Space, Spin, Button } from 'antd';
import { getRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { Avatar, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AliwangwangOutlined, UpOutlined } from '@ant-design/icons';

const Chat = () => {
    const [parentPopup, setParentPopup] = useState(false);
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
        <>
            <div className='chat-container'>
                <Button onClick={() => { setParentPopup(!parentPopup) }}><AliwangwangOutlined />Chat<span style={{ marginLeft: '60px' }}><UpOutlined /></span></Button>


            </div>
            {parentPopup &&
                <Space className='parent-popup' direction="vertical" size={16}>
                    <Card className='popup-card'
                        title=""
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
            }
        </>
    );
}

export default Chat;
