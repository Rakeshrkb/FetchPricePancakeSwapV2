const ethers = require('ethers');
const { factoryAddress, pairAddress, WBNBAddress, BUSDAddress, routerAddress } = require("./AddressList");
const { routerABI, pairABI, factoryABI, erc20ABI } = require("./AbiInfo");
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");


const factoryContract = new ethers.Contract(factoryAddress, factoryABI, provider);
const routerContract = new ethers.Contract(routerAddress, routerABI, provider);

const fetchPrice = async (humanFormat) => {
    const token0 = new ethers.Contract(WBNBAddress, erc20ABI, provider);
    const token1 = new ethers.Contract(BUSDAddress, erc20ABI, provider);
    const decimal0 = await token0.decimals();
    const decimal1 = await token1.decimals();
    const amountIn = ethers.utils.parseUnits(humanFormat, decimal0);

    try {
        const amountOut = await routerContract.getAmountsOut(amountIn, [WBNBAddress, BUSDAddress]);
        const humanOutput = ethers.utils.formatUnits(amountOut[1].toString(), decimal1);
        console.log("The AmountOut Is", humanOutput);
    } catch (error) {
        console.error("Error fetching price:", error);
    }
}

const humanFormat = "100";
fetchPrice(humanFormat);
