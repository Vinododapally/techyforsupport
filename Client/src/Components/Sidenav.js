import React, { useState } from "react";
//react pro sidebar components
import {
ProSidebar,
Menu,
MenuItem,
SidebarHeader,
SidebarContent,
} from "react-pro-sidebar";
//icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
//sidebar css from react-pro-sidebar module
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidenav.css";
const Sidenav = () => {
//menuCollapse state using useState hook
const [menuCollapse, setMenuCollapse] = useState(false)
//custom function that will change menucollapse state from false to true and true to false
const menuIconClick = () => {
//condition checking to change state from true to false and vice versa
menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
};

const navigate = useNavigate();
    const goto = () => {
        navigate('/author')
    }
return (
<>
<div id="header">
{/* collapsed props to change menu size using menucollapse state */}
<ProSidebar collapsed={menuCollapse}>
<SidebarHeader>
<div className="logotext">

<p>{menuCollapse ? <GiAbstract050 /> : <SiApacheairflow /> }</p>
</div>
<div className="closemenu" onClick={menuIconClick}>
{/* changing menu collapse icon on click */}
{menuCollapse ? (
<FiArrowRightCircle/>
) : (
<FiArrowLeftCircle/>
)}
</div>
</SidebarHeader>
<SidebarContent>
<Menu iconShape="square">
<MenuItem active={true} icon={<FiHome />}>
Home
</MenuItem>
<MenuItem icon={<FaList />}>Category</MenuItem>
<MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
<MenuItem icon={<RiPencilLine />} onClick={goto}>Author</MenuItem>
<MenuItem icon={<BiCog />}>Settings</MenuItem>
</Menu>
</SidebarContent>
{/* <SidebarFooter>
<Menu iconShape="square">
<MenuItem icon={<FiLogOut />}>Logout</MenuItem>
</Menu>
</SidebarFooter> */}
</ProSidebar>
</div>
</>
);
}
export default Sidenav