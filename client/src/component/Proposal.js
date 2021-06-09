import React,{Component} from "react";
import { Link} from "react-router-dom";

// class Proposal extends Component{
//     render(){
function Proposal(props){
    const nameRef = React.useRef();
        return(
            <div className ="Proposal">
                <h1> Admin Panel </h1>
                <div className="contents">

                <h2>  Add the proposal </h2>
                <form onSubmit={(event)=>{
                    event.preventDefault();
                    const title = nameRef.current.value;
                    props.addproposal(title);
                }} >

                    <input
                    //  ref ={(input)=> task =input}
                    type="text" name ="title" placeholder="Add proposal"  
                    ref ={nameRef}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                    />
                    <button  
                    // onClick ={props.handlechange}
                    >Submit</button>
                           
                </form>
                <p> Your address is {props.address}</p>
                <a href  ="/Vote"> Click here to vote your favourite Proposal</a>

            </div>
            </div>

        )
    }
// }
export default Proposal;