import React from "react";
import ReactStars from "react-rating-stars-component";


const setRatingStars = {
    size: 50,
    count: 5,
    color: "black",
    activeColor: "",
    value: 0,
    a11y: true,
    isHalf: false,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    // onChange: newValue => {
    //   console.log(`Example 2: new value is ${newValue}`);
      
    // }
  }

const profileStars = {
    size: 30,
    count: 5,
    color: "black",
    activeColor: "yellow",
    value: 0,
    edit: false,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      console.log(`Example 2: new value is ${newValue}`);
    }
  }


  const profileListingStars = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "yellow",
    value: 0,
    edit: false,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    // onChange: newValue => {
    //   console.log(`Example 2: new value is ${newValue}`);
    // }
  }


  export function RatingStars({children}) {
    return (
      <div className="">
        
       {children}
       
      </div>
    );
  }

  RatingStars.profileView = function ({children, stars}){
      return <ReactStars {...profileStars} value={stars} />
  }
  

  RatingStars.profileListingStars = function ({children, stars}){
    return <ReactStars {...profileListingStars} value={stars} >
            {children}
            </ReactStars>
}

RatingStars.rating = function({children, ...restProps}){
    return <div>
        <ReactStars {...setRatingStars} {...restProps}
       
        >
         </ReactStars>

         </div>
}

RatingStars.messageBox = function({children, ...restProps}){
    return <span style={{display: 'block'}}>
        {/* <label>Message</label> */}
        <textarea {...restProps} />
    </span> 
    
}

RatingStars.ratingSubmit = function({children, ...restProps}){
    return <button  {...restProps}
    style={{display: 'block'}}
    > {children}
     </button>
    
}

const reasons = [{title:"Bad call quality"}, 
{title:"Bad service quality"}]
RatingStars.feedbackReasons = function ({children, label, ...restProps}){
    return < >
    <label>{label}</label>
    <select {...restProps} style={{display: 'block'}}>
        <option value="">Select a reason</option>
        {
            reasons.map(item =>{
                return <option key={item.title} value={item.title}>{item.title} </option>
            })
        }
        </select>
        </>
}