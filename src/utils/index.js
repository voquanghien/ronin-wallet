function roundToThree(num) {    
  return +(Math.round(num + "e+3")  + "e-3");
}

export const formatBalance = num => {
  const split = roundToThree(num).toString().split(".");
  return `${split[0].replace(/\B(?<!\.\d)(?=(\d{3})+(?!\d))/g, ",")}${split[1] ? `.${split[1]}` : ""}`;
};

export const formatWalletAddress = address => {
  return address.toString().replace(/(.{3}).+(.{3})$/g, "$1...$2"); 
}

