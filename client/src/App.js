// import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

// import "./App.css";

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 40</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

// export default App;
import React, { useState ,useEffect} from "react";
import getWeb3 from "./getWeb3";
import VotingContract from "./contracts/Voting.json"
import "./App.css";
import Proposal from "./component/Proposal";
import Vote from "./component/Vote";
import {Route, Switch , BrowserRouter, Link} from "react-router-dom";

// class  App extends Component{
//   constructor(props){
//     super(props)
//     this.state= {web3:null,accounts :null,contract:null,proposals:[],proposaltitle:null};
//     this.handlechange = this.handlechange.bind(this);
//     this.addproposal = this.addproposal.bind(this);
//     this.handlevote = this.handlevote.bind(this);

//   } 
//   componentDidMount = async()=>{
//     try{
//       //obtain the web3 using getweb3 function
//      const web3 = await getWeb3();
//       //obtain the accounts
//      const accounts = await web3.eth.getAccounts();
//      console.log(accounts);
//       //obtain the network id 
//       const networkId = await web3.eth.net.getId();
//       console.log(networkId);
//       const networkdeployed = VotingContract.networks[networkId];
//       //obtain the votingcontract instance
//       const instance = await  new web3.eth.Contract(VotingContract.abi, 
//         networkdeployed && networkdeployed.address);
      
//     this.setState({web3, accounts, contract:instance});
//       // this.loaddata);
//     }
//     catch(error){
//       alert("Failed to load the details. Concern console for further details");
//       console.log(error);

//     }

//   }
//   loaddata = async ()=>{
//     const {accounts,contract}=this.state;
//   }
  
//    handlechange(event){
//      event.preventdefaut()
//     const stage = "hh";
//     try{
//       this.addproposal()
//     } catch(error){
//      console.log(error);
//     }
//     console.log(stage)
//     // this.change();
//      alert("hh")
  
//   }
//   addproposal(value){
//   const add = this.state.contract.methods.addproposal(value);
//   console.log(add);
//   }
//   handlevote(event){
//   alert("hi ")
//   }
//   render(){
    
//           if (!this.state.web3) {
//             return <div>Loading Web3, accounts, and contract...</div>;
//           }
  function App(){
    const [loading, setLoading] = useState(true);
    // const [voters,setVoters] = useState();
    const[proposals,setProposals] = useState([]);
    const[currentAccount,setCurrentAccount] = useState('');
    const [voting, setVoting] = useState({});
    const getDatafromWeb3 = async()=>{
      try{
              //obtain the web3 using getweb3 function
             const web3 = await getWeb3();
              //obtain the accounts
             const accounts = await web3.eth.getAccounts();
             console.log(accounts);
               //obtain the network id 
              const networkId = await web3.eth.net.getId();
              console.log(networkId);
              const networkdeployed = VotingContract.networks[networkId];
               //obtain the votingcontract instance
              const instance = await  new web3.eth.Contract(VotingContract.abi, 
                networkdeployed && networkdeployed.address);
              setCurrentAccount(accounts[0]);
              setVoting({...instance});
             //Obtain the proposal list from blockchain
             const Projectcounter = await instance.methods.gettotalProposal().call();
             console.log(Projectcounter);
             const Proposallists =[];
             for (let i =0;i<Projectcounter;i++){
               const project = await instance.methods.getProposal(i).call();
               console.log(project);
               Proposallists.push(project);
             }
             setProposals(Proposallists);
             setLoading(false);
            //  console.log(proposals);
        
            }
            catch(error){
              alert("Failed to load the details. Concern console for further details");
              console.log(error);
        
            }
        
        //   }

    }
    const addproposal = async(title) =>{
      setLoading(true);
      try{
         const res= voting.methods.addproposal(title).send({from:currentAccount}).once('receipt',async(receipt)=>{
            await getDatafromWeb3();
            setLoading(false);
          })
          console.log(res)
          
      }
      catch(error){
        alert("Proposal not added view console for error");
        console.log(error);
      }
    }
    const handlevote = async(id)=>{
      // alert("Handle vote successfully executed for id ");
      // alert(id);
      // const web3 = await getWeb3();
      const voterStatus = await voting.methods.hasvoted(id, currentAccount).call();
      console.log(voterStatus);
      if(voterStatus === true){
        alert("Sorry you can't Vote.Already voted");
         }
         else{
          voting.methods.vote(id).send({from:currentAccount});
         }
      // const account = await web3.eth.getAccounts();
      
       
      // console.log(voterStatus);
      // setVoters(voterStatus);
      
      
    }
    // const  getVoterStatus =async(id)=>{
    //   const web3 = await getWeb3();

    //   const account = await web3.eth.getAccounts();
    //   console.log("hh")
    //   const voterStatus = voting.methods.hasvoted(id, account).call();
    //   console.log(voterStatus);
    //   setVoters(voterStatus);
    // }
    useEffect(()=>{
       getDatafromWeb3();
    },[]);
    
  return(
    <div className ="Mainpage"> 
    <h1> Welcome to Voting dapp
      {/* {currentAccount || ''} */}
      {/* {this.change} */}
      </h1>
      <BrowserRouter>
      <Switch>

        {/* <Route path='/home' exact>
        <Proposal/>

        </Route> */}
        <Route path ="/vote">
          <Vote 
                   handlevote = {handlevote}
                  //  voters ={voters}
                   proposals ={proposals}
                   address ={currentAccount}
                   />

        </Route>
        <Route path='/'  >
        <Proposal 
        // handlechange = {this.handlechange}
        addproposal ={addproposal}
        />
        </Route>
        </Switch>

      </BrowserRouter>

      </div>
  )}
  export default App;


