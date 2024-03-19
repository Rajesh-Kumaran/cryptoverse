import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from "antd";
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    const items = [
        {
            label: "Home",
            key: "/",
            icon: <HomeOutlined />
        },
        {
            label: "Cryptocurrencies",
            key: "/cryptocurrencies",
            icon: <FundOutlined />
        },
        {
            label: "News",
            key: "/news",
            icon: <BulbOutlined />
        }
    ]

    return (
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className='logo'>
                    <Link to="/">Crypoverse</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme='dark' items={items} onClick={({ key }) => navigate(key)} />
            )}
        </div>
    )
}

export default Navbar