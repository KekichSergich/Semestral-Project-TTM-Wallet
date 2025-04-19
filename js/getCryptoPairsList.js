export async function getCryptoPairsList() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1";
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching crypto list:", error);
      return [];
    }
  }
  


// async function getCryptoPairsList(){
//     try {
//         const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
//         const cryptoPairListOptions = await response.json();
//         return cryptoPairListOptions;
//     } catch (error) {
//         console.error("Error with fetch: ", error);
//         return [];
//     }
// }

  
  
// async function getCryptoPriceList(){
//     // const coins = await getCryptoPairsList();
//     // const coinsID = coins.map(coin => coin.id);

//     try {
//         const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
//         const cryptoPriceList = await response.json();
//         return cryptoPriceList;
//     } catch (error){
//         console.error("Error with fetch: ", error);
//         return [];
//     }
// }