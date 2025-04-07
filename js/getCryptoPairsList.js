async function getCryptoPairsList(){
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const cryptoPairListOptions = await response.json();
        return cryptoPairListOptions;
    } catch (error) {
        console.error("Error with fetch: ", error);
        return [];
    }
}