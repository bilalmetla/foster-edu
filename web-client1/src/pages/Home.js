
import React from "react";

import {  Banner, Services,
   Testimonials,StartTutoringBanner, 
   HaveQuestion} from "./../components";

class Home extends React.Component {
 
  render(){
    return (

      <div>
        <Banner />
        <Services />
        <Testimonials />
        <StartTutoringBanner />
        <HaveQuestion />
      </div>
    );
  }
  
}

export default Home;
