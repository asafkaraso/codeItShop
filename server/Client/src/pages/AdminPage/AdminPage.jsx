import React from 'react'
import Nav from '../../components/Nav/Nav.jsx'
import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/Error/Error.jsx";
import { useSelector, useDispatch } from 'react-redux';
import DataTable from '../../components/DataTable/DataTable.jsx';

const AdminPage = () => {
    return (
        <>
            <Nav />
            <DataTable/>
            
        </>
    )
}

export default AdminPage