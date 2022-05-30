import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@urql/core';
import Link from "next/link"

const query = `
query{
  tokens {
    id
    count
    tokenaddress
    creator
    name
    symbol
    totalSupply
  }
}
`
const client = createClient({
  url: "https://api.thegraph.com/subgraphs/name/kirtirajsinh/tokenwindow"
})
const Tokens = () => {
    const {address} = useRouter().query
    const [tokens, setTokens] = useState(null);
    async function fetchData() {
      const response = await client.query(query).toPromise();
      console.log('response:', response)
      {response.data.tokens && setTokens(response.data.tokens);}
    }
    useEffect(() => {
     fetchData()
    }, [address])

  return (
    <div className="flex-col items-center justify-center" >
      <div>
        <h1 className="text-blue-700 text-4xl text-center">Tokens Created</h1>
      </div>
        
        <div className="flex flex-row flex-wrap p-2 items-center justify-center">
          { tokens && 
  tokens.map((token) => (
    <div key={token.tokenaddress} className="border shadow-lg shadow-blue-500 hover:bg-blue-200 border-black p-2 mt-2 mx-2">
      <Link href={`https://rinkeby.etherscan.io/token/${token.tokenaddress}`}>
      <p className="" >
        <span className="text-lg">Token Name:</span> {token.name} <br></br>
        <span className="text-lg">Token Symbol:</span>  ${token.symbol} <br></br>
        <span className="text-lg">Token Creator</span> {token.creator}<br/>
        <span className="text-lg">Token Address</span> {token.tokenaddress} <br/>
        <span className="text-lg">Token Supply:</span>  {token.totalSupply} <br/> 
      </p>
      </Link>
      
     </div>
  ))

}

        </div>
    </div>
  )
}

export default Tokens