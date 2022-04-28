// round to three digits if float number
function roundToThree(num) {    
  return +(Math.round(num + "e+3")  + "e-3");
}

// format number of balance 
// add comma after each 3 digits from right to left before "." (if exised)
// keep 3 digits after "." if (existed)
// ex: 1000.01 => 1,000.01
export const formatBalance = num => {
  const split = roundToThree(num).toString().split(".");
  return `${split[0].replace(/\B(?<!\.\d)(?=(\d{3})+(?!\d))/g, ",")}${split[1] ? `.${split[1]}` : ""}`;
};


// format wallet address 
// get 3 first and 3 last charaters and replace the rest charaters with "." if string length > 7
export const formatWalletAddress = address => {
  return address.length > 7 ? address.toString().replace(/(.{3}).+(.{3})$/g, "$1...$2") : address; 
}

