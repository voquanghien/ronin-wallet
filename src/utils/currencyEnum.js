import USD from '../assets/currency/USD.png';
import EUR from '../assets/currency/EUR.png';
import YEN from '../assets/currency/YEN.png';
import BTC from '../assets/currency/BTC.png';
import ETH from '../assets/currency/ETH.png';

// define enum for currency
export const currencyEnum = Object.freeze({
	USD: {
    img: USD,
    value: "USD"
  },
	EUR: {
    img: EUR,
    value: "EUR"
  },
	YEN: {
    img: YEN,
    value: "YEN"
  },
	BTC: {
    img: BTC,
    value: "BTC"
  },
	ETH: {
    img: ETH,
    value: "ETH"
  },
});