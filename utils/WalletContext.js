import {useState, createContext, useEffect} from "react";

export const WalletContext = createContext([]);

const networks = 
  {"name":"Rinkeby","title":"Ethereum Testnet Rinkeby","chain":"ETH","network":"testnet","rpc":["https://rinkeby.infura.io/v3/${INFURA_API_KEY}","wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}"],"faucets":["http://fauceth.komputing.org?chain=4&address=${ADDRESS}","https://faucet.rinkeby.io"],"nativeCurrency":{"name":"Rinkeby Ether","symbol":"RIN","decimals":18},"infoURL":"https://www.rinkeby.io","shortName":"rin","chainId":4,"networkId":4,"ens":{"registry":"0xe7410170f87102df0055eb195163a03b7f2bff4a"},"explorers":[{"name":"etherscan-rinkeby","url":"https://rinkeby.etherscan.io","standard":"EIP3091"}]}


 const WalletProvider = ({children}) => {
    const [wallet, setWallet] = useState('');
    const [network, setNetwork] = useState('');
    const checkIfWalletIsConnected = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setWallet(account);
          } else {
            console.log("No authorized account found")
          }
        } catch (error) {
          console.log(error);
        }
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);

    ethereum.on('chainChanged', handleChainChanged);
    
    // Reload the page when they change networks
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
      }

      useEffect(() =>{
        checkIfWalletIsConnected()
      },[])
    return(
        <WalletContext.Provider value={{userwallet:[wallet, setWallet], walletNetwork:[network, setNetwork]}}>
            {children}
        </WalletContext.Provider>
    )
}
export default WalletProvider;