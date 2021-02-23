
import React from "react";

import {  Banner, Services,
   Testimonials,StartTutoringBanner, CallingDemo,
   HaveQuestion} from "./../components";

class Home extends React.Component {
 
  render(){
    return (

      <div>
        <Banner />
        <Services />
        <CallingDemo />
        <Testimonials />
        <StartTutoringBanner />
        <HaveQuestion />
      </div>
    );
  }
  
}

export default Home;
