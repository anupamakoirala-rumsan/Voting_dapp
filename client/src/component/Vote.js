import React, { useImperativeHandle } from"react";
function Vote(props){
    console.log(props.address)
    console.log(props.voters)
    return(
        <div className="container">
            
            <h1>Voter list </h1> 
            {/* {this.props.handelchange} */}
            <div className ="content">

            <ul >{props.proposals.map((proposal,key)=>(
                <div className ="template" key={key}>

            <li>
                 <p><b> Candidate Name:{proposal.title}</b></p>
                 <p>Proposed by: {proposal.proposedby}</p>
                 <p> Votecount: {proposal.votecount}</p>
                 <p> ProposalId:{proposal.Id}</p>
                 <button  name={proposal.Id}
                 onClick ={(e)=>{
                     props.handlevote(e.target.name);}}
                //   disabled ={props.voters}
                 >Vote</button>
                 
                 <hr/>
             </li>
             </div>
   ))}

            </ul>
        </div>
        <a href ="/"> Want to add the proposal?</a>

        </div>

    )

}
export default Vote;
