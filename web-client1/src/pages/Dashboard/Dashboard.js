
import React from "react";

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import PostList from '../../components/PostList'

const Dashboard2 = ()=>{
    return (
        <Admin dataProvider={simpleRestProvider('http://127.0.0.1:3001/')}> 
            <Resource name="posts" list={PostList} />
        </Admin>
    )

}

export default Dashboard2