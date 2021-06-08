import React from 'react'
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import SearchForm from '../../Components/SearchForm/SearchForm';
import {useStyles} from '../RoomSearchPage/RoomSearch.style';


function RoomSearch() {
    const classes = useStyles();

    return (
        <div>
           <Header/>
           <SearchForm/>
           <Footer/>
        </div>
    )
}

export default RoomSearch
