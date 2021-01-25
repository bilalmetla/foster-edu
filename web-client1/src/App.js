
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import logo from './logo.svg';
import './App.css';

import { Header, Banner, Services,
   Testimonials,StartTutoringBanner, 
   HaveQuestion, Footer } from "./components";

class App extends React.Component {
 
  render(){
    return (

      <div>
        <Header />
        <Banner />
        <Services />
        <Testimonials />
        <StartTutoringBanner />
        <HaveQuestion />
        <Footer />
      </div>
    );
  }
  
}

export default App;
