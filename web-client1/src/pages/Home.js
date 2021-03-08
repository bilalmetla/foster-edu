
import React from "react";

import {  Banner, Services,
   Testimonials,StartTutoringBanner, CallingDemo,
   HaveQuestion} from "./../components";

   import { FaqsContainer } from "../containers/faqs.js";

   import ClassRoom from "../classroom";

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
        <FaqsContainer isMoreFaqsShow="true" showFaqs="5" />
      </div>
    );
  }
  
}

export default Home;
