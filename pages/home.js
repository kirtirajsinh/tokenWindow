import React, {useState, useContext, useEffect} from 'react'
import { WalletContext } from "../utils/WalletContext"
import TokenCreator from "../artifacts/contracts/TokenCreator.sol/TokenCreator.json"
import {ethers} from "ethers"
import Link from 'next/link'
const home = () => {
    const [tokenSymbol , setTokenSymbol] = useState("");
    const [communityName, setCommunityName] = useState("");
    const [totalSupply, setTotalSupply] = useState();
    const [decimal, setDecimal] = useState(18);
    const {userwallet, walletNetwork} = useContext(WalletContext);
    const [wallet] = userwallet;
     const [tokenAddress, setTokenAddress] = useState(null);
    const CONTRACT_ADDRESS = "0xb4C9423C3768B8CbCDdC99bc360F210a5E7287FF"
    const handleSubmit = async() =>{
      event.preventDefault();
      await createCommunity(totalSupply, 18, communityName, tokenSymbol, wallet);
    }

    const createCommunity = async(totalSupply,decimal, communityName, tokenSymbol, wallet) =>{
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, TokenCreator.abi, signer);
        console.log("Going to pop wallet now to pay gas...")
        
        const res = await contract.create(totalSupply, decimal, communityName, tokenSymbol, wallet);
        const receipt = await res.wait();

        if (receipt.status === 1) {
          console.log("Domain minted! https://rinkeby.etherscan.io/tx/"+res.hash);
          setTokenAddress(res.hash);
        }
        else {
          alert("Transaction failed! Please try again");
        }
  
  
        
      } catch (error) {
        console.error("Error creating Community", error);
      }
    }

useEffect(() =>{console.log(wallet)},[wallet])

  return (
    <div className="h-screen border border-black  flex flex-col items-center justify-center"> 
      <div className="mb-4">
      <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="communityName">
        Token Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="community" type="text" placeholder="Token Name"  onChange={e => setCommunityName(e.target.value)} />
    </div>
    <div className="mb-4">
      <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="tokenSymbol">
        Token Symbol
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="tokenSymbol" type="text" placeholder="Token Symbol"  onChange={e => setTokenSymbol(e.target.value)}/>
    </div>
    <div className="mb-6">
      <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="tokenSymbol">
        Total Supply
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="tokenSymbol" type="number" placeholder="Token Symbol"  onChange={e => setTotalSupply(Number(e.target.value))} />
    </div>
    <button className="border border:black-500 p-5 hover:bg-red-50" onClick={handleSubmit}>Submit </button>
    {tokenAddress && <div>Check Out Your Token. <Link href={`https://rinkeby.etherscan.io/tx/${tokenAddress}`}>Here</Link>  </div>}
</div>
    )
}

export default home