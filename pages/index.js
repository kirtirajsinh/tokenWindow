import {useContext, useState, useEffect} from "react"
import { WalletContext } from "../utils/WalletContext"
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Tokens from "../Components/Tokens"

export default function Home() {
  const {userwallet, walletNetwork} = useContext(WalletContext)
  const [wallet, setWallet] = userwallet
  const [network, setNetwork] = walletNetwork
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setWallet(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4' }], // Check networks.js for hexadecimal network ids
        });
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {	
                  chainId: '4',
                  chainName: 'Rinkeby',
                  rpcUrls: ['https://rinkeby.infura.io/v3/'],
                  nativeCurrency: {
                      name: "Rinkeby Ether",
                      symbol: "Rinkeby",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://rinkeby.etherscan.io/"]
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    } 
  }
  const renderInputForm = () =>{
    // If not on Rinkeby Testnet, render the switch button
    if (wallet && network !== 'Rinkeby') {
      return (
        <div className="connect-wallet-container flex flex-row">
          <h2 className="bg-red-600 p-2 mt-2 rounded border border-black text-white">Only Rinkeby Testnet Supported. Please switch to Rinkeby Testnet 👉</h2>
          {/* This button will call our switch network function */}
          <button className='button rounded mx-2 border bg-red-500 mt-2 p-2 border-black hover:bg-red-600 shadow-lg shadow-red-50' onClick={switchNetwork}>Switch to Rinkeby</button>
        </div>
      )
    }
  }
  
  return (
    <div>
      <div className="flex justify-between bg-blue-500 h-9">
        <h1 className="text-2xl text-white ml-2">TokenWindow</h1>
        <div>
            {wallet && (<h3 className="text-white pr-6">{wallet.slice(0,6)}...{wallet.slice(-4)}</h3>)}
        </div>
      </div>
    <div className="flex flex-col items-center justify-center h-screen" >
      <div>
        <h1 className="text-xl font-extrabold text-center font-header text-blue-500 md:text-5xl">Create Your own ERC20 $TOKEN<span className="text-sm text-black md:text-2xl"> Rinkeby Testnet</span></h1>
      </div>
      <p className="text-2xl font-header p-3 text-center">Distribute among friends,<br></br><span  >flex and have Funn</span> </p>
      <div>
     {!wallet ? (
          <button className="border border-black max-w-md hover:bg-gray-400 p-2 rounded-full shadow-lg shadow-blue-500" onClick={connectWallet}>
            Connect Wallet
          </button>
        ): (
          <button className="border border-black max-w-md hover:bg-blue-500 p-2 my-2 rounded-full shadow-md shadow-blue-500">
            <Link href="/home">
            Create Token
            </Link>
          </button>
        )}
      </div>
      {renderInputForm()}
    </div>
    <div>
      <Tokens />
    </div>
    </div>

  )
}
