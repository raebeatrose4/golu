const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "You need to login first";
const { nftCollectionAddress } = props;
const nftCollectionABI = [
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
State.init({ isLoggedIn: false, error: "", loading: false });

const testAddress = "0x0B60Fdd11E852cd1191c298e8f7D3Fe4af919168";

const loginToDao = async () => {
  State.update({ loading: true });
  const signer = Ethers.provider().getSigner();
  const nftContract = new ethers.Contract(
    nftCollectionAddress,
    nftCollectionABI,
    signer
  );
  nftContract
    .balanceOf(sender)
    .then((res) => {
      const nftCount = parseInt(res["_hex"], 16);
      if (nftCount > 0) {
        State.update({ isLoggedIn: true });
      } else {
        State.update({ error: "Tu chutiya hai bhai" });
      }
      State.update({ loading: false });
    })
    .catch((error) => console.log(error));
};

return (
  <div>
    {!state.isLoggedIn ? (
      <div>
        <h1 className="bg-black text-white">NFT Gateway</h1>
        <p>
          You are logged in as :{" "}
          <span
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "0.5rem",
              borderRadius: "0.25rem",
            }}
          >
            {sender}
          </span>
        </p>
        {state.loading}
        <button onClick={loginToDao} disabled={state.loading}>
          Login to DAO
        </button>
        {state.error}
      </div>
    ) : (
      <div>You are logged in now motherfucker</div>
    )}
  </div>
);
