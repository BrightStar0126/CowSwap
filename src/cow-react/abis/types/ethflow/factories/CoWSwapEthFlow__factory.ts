/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CoWSwapEthFlow,
  CoWSwapEthFlowInterface,
} from "../CoWSwapEthFlow";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ICoWSwapSettlement",
        name: "_cowSwapSettlement",
        type: "address",
      },
      {
        internalType: "contract IWrappedNativeToken",
        name: "_wrappedNativeToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "EthTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectEthAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
    ],
    name: "NotAllowedToInvalidateOrder",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowedZeroSellAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "OrderIsAlreadyExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
    ],
    name: "OrderIsAlreadyOwned",
    type: "error",
  },
  {
    inputs: [],
    name: "ReceiverMustBeSet",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "orderUid",
        type: "bytes",
      },
    ],
    name: "OrderInvalidation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "sellToken",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "buyToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "sellAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyAmount",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "validTo",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "appData",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "kind",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "partiallyFillable",
            type: "bool",
          },
          {
            internalType: "bytes32",
            name: "sellTokenBalance",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "buyTokenBalance",
            type: "bytes32",
          },
        ],
        indexed: false,
        internalType: "struct GPv2Order.Data",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "enum ICoWSwapOnchainOrders.OnchainSigningScheme",
            name: "scheme",
            type: "uint8",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        indexed: false,
        internalType: "struct ICoWSwapOnchainOrders.OnchainSignature",
        name: "signature",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "OrderPlacement",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "orderUid",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "address",
        name: "refunder",
        type: "address",
      },
    ],
    name: "OrderRefund",
    type: "event",
  },
  {
    inputs: [],
    name: "cowSwapSettlement",
    outputs: [
      {
        internalType: "contract ICoWSwapSettlement",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "buyToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "sellAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "appData",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "validTo",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "partiallyFillable",
            type: "bool",
          },
          {
            internalType: "int64",
            name: "quoteId",
            type: "int64",
          },
        ],
        internalType: "struct EthFlowOrder.Data",
        name: "order",
        type: "tuple",
      },
    ],
    name: "createOrder",
    outputs: [
      {
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "buyToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "sellAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "appData",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "validTo",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "partiallyFillable",
            type: "bool",
          },
          {
            internalType: "int64",
            name: "quoteId",
            type: "int64",
          },
        ],
        internalType: "struct EthFlowOrder.Data",
        name: "order",
        type: "tuple",
      },
    ],
    name: "invalidateOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "buyToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "sellAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "buyAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "appData",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "feeAmount",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "validTo",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "partiallyFillable",
            type: "bool",
          },
          {
            internalType: "int64",
            name: "quoteId",
            type: "int64",
          },
        ],
        internalType: "struct EthFlowOrder.Data[]",
        name: "orderArray",
        type: "tuple[]",
      },
    ],
    name: "invalidateOrdersIgnoringNotAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "orderHash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "orders",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "validTo",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "unwrap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "wrap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wrapAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wrappedNativeToken",
    outputs: [
      {
        internalType: "contract IWrappedNativeToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60e06040523480156200001157600080fd5b5060405162001b2a38038062001b2a83398101604081905262000034916200021e565b816200004b816200015260201b6200089b1760201c565b608052506001600160a01b0380831660a081905290821660c081905260408051634daa966160e11b81529051919263095ea7b3929091639b552cc291600480830192602092919082900301816000875af1158015620000ae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000d491906200025d565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015260001960248201526044016020604051808303816000875af115801562000123573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000149919062000284565b505050620002a8565b604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f6c85c0337eba1661327f94f3bf46c8a7f9311a563f4d5c948362567f5d8ed60c918101919091527ff9446b8e937d86f0bc87cac73923491692b123ca5f8761908494703758206adf606082015246608082018190526001600160a01b03831660a083015260009160c00160405160208183030381529060405280519060200120915050919050565b6001600160a01b03811681146200021b57600080fd5b50565b600080604083850312156200023257600080fd5b82516200023f8162000205565b6020840151909250620002528162000205565b809150509250929050565b6000602082840312156200027057600080fd5b81516200027d8162000205565b9392505050565b6000602082840312156200029757600080fd5b815180151581146200027d57600080fd5b60805160a05160c0516118216200030960003960008181610129015281816105ff015281816107ad0152818161082501528181610c3301526110310152600081816102ce0152610f4b015260008181610bf70152610cd901526118216000f3fe6080604052600436106100b55760003560e01c80637bc41b9611610069578063de0e9a3e1161004e578063de0e9a3e1461027c578063ea598cb01461029c578063ec30bb88146102bc57600080fd5b80637bc41b96146101c85780639c3f1e90146101e857600080fd5b8063322bba211161009a578063322bba21146101705780634c84c1c8146101915780634cb76498146101a857600080fd5b80631626ba7e146100c157806317fcb39b1461011757600080fd5b366100bc57005b600080fd5b3480156100cd57600080fd5b506100e16100dc36600461126e565b6102f0565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020015b60405180910390f35b34801561012357600080fd5b5061014b7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161010e565b61018361017e36600461132b565b6103de565b60405190815260200161010e565b34801561019d57600080fd5b506101a6610720565b005b3480156101b457600080fd5b506101a66101c3366004611344565b61072b565b3480156101d457600080fd5b506101a66101e336600461132b565b610770565b3480156101f457600080fd5b5061024b6102033660046113ba565b60006020819052908152604090205473ffffffffffffffffffffffffffffffffffffffff81169074010000000000000000000000000000000000000000900463ffffffff1682565b6040805173ffffffffffffffffffffffffffffffffffffffff909316835263ffffffff90911660208301520161010e565b34801561028857600080fd5b506101a66102973660046113ba565b61077e565b3480156102a857600080fd5b506101a66102b73660046113ba565b610821565b3480156102c857600080fd5b5061014b7f000000000000000000000000000000000000000000000000000000000000000081565b60008281526020818152604080832081518083019092525473ffffffffffffffffffffffffffffffffffffffff81168083527401000000000000000000000000000000000000000090910463ffffffff1692820192909252901580159061036f5750805173ffffffffffffffffffffffffffffffffffffffff90811614155b8015610385575042816020015163ffffffff1610155b156103b357507f1626ba7e0000000000000000000000000000000000000000000000000000000090506103d8565b507fffffffff0000000000000000000000000000000000000000000000000000000090505b92915050565b60006103f260a08301356040840135611402565b341461042a576040517f8b6ebb4d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160400135600003610468576040517feaec5c9d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b4261047960e0840160c0850161142e565b63ffffffff1610156104b7576040517f89bb260100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60408051808201909152338152600090602081016104db60e0860160c0870161142e565b63ffffffff169052604080518082019091529091506000908082815260200130604051602001610536919060609190911b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016815260140190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815291905290529050600061057c61012086016101008701611462565b6020808501516040516105c393920160c09290921b825260e01b7fffffffff00000000000000000000000000000000000000000000000000000000166008820152600c0190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152919052835190915061063a906106337f000000000000000000000000000000000000000000000000000000000000000061062d368a90038a018a6114b1565b9061095b565b8484610b2a565b60008181526020819052604090205490945073ffffffffffffffffffffffffffffffffffffffff16156106a1576040517f56a1d2b2000000000000000000000000000000000000000000000000000000008152600481018590526024015b60405180910390fd5b505060008281526020818152604090912082518154929093015163ffffffff1674010000000000000000000000000000000000000000027fffffffffffffffff00000000000000000000000000000000000000000000000090921673ffffffffffffffffffffffffffffffffffffffff90931692909217179055919050565b61072947610821565b565b60005b8181101561076b5761075983838381811061074b5761074b61154b565b905061012002016000610c2c565b806107638161157a565b91505061072e565b505050565b61077b816001610c2c565b50565b6040517f2e1a7d4d000000000000000000000000000000000000000000000000000000008152600481018290527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690632e1a7d4d90602401600060405180830381600087803b15801561080657600080fd5b505af115801561081a573d6000803e3d6000fd5b5050505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168260405160006040518083038185875af1925050503d806000811461081a576040519150601f19603f3d011682016040523d82523d6000602084013e61081a565b604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f6c85c0337eba1661327f94f3bf46c8a7f9311a563f4d5c948362567f5d8ed60c918101919091527ff9446b8e937d86f0bc87cac73923491692b123ca5f8761908494703758206adf6060820152466080820181905273ffffffffffffffffffffffffffffffffffffffff831660a083015260009160c00160405160208183030381529060405280519060200120915050919050565b604080516101808101825260008082526020808301829052928201819052606082018190526080820181905260a0820181905260c0820181905260e082018190526101008201819052610120820181905261014082018190526101608201529083015173ffffffffffffffffffffffffffffffffffffffff16610a0a576040517fefc9ccdf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040518061018001604052808373ffffffffffffffffffffffffffffffffffffffff168152602001846000015173ffffffffffffffffffffffffffffffffffffffff168152602001846020015173ffffffffffffffffffffffffffffffffffffffff168152602001846040015181526020018460600151815260200163ffffffff80168152602001846080015181526020018460a0015181526020017ff3b277728b3fee749481eb3e0b3b48980dbbab78658fc419025cb16eee34677581526020018460e00151151581526020017f5a28e9363bb942b639270062aa6bb295f434bcdfc42c97267bf003f272060dc981526020017f5a28e9363bb942b639270062aa6bb295f434bcdfc42c97267bf003f272060dc9815250905092915050565b60008473ffffffffffffffffffffffffffffffffffffffff167fcf5f9de2984132265203b5c335b25727702ca77262ff622e136baa7362bf1da9858585604051610b7693929190611676565b60405180910390a25050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe00180517fd5a25ba2e97094ad7d83dc28a6572da797d6b3e7fc6663bd93efb789fc17e48982526101a0822091526040517f190100000000000000000000000000000000000000000000000000000000000081527f00000000000000000000000000000000000000000000000000000000000000006002820152602281019190915260429020919050565b6000610c617f000000000000000000000000000000000000000000000000000000000000000061062d368690038601866114b1565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0810180517fd5a25ba2e97094ad7d83dc28a6572da797d6b3e7fc6663bd93efb789fc17e48982526101a082209152604080517f190100000000000000000000000000000000000000000000000000000000000081527f0000000000000000000000000000000000000000000000000000000000000000600282015260228101929092526042909120600081815260208181529083902083518085019094525473ffffffffffffffffffffffffffffffffffffffff8082168086527401000000000000000000000000000000000000000090920463ffffffff1692850183905294955091934290911015911480610d8d5750815173ffffffffffffffffffffffffffffffffffffffff16155b80610db75750808015610db75750815173ffffffffffffffffffffffffffffffffffffffff163314155b15610dff578415610df7576040517ff8cc70ce00000000000000000000000000000000000000000000000000000000815260048101849052602401610698565b505050505050565b60008381526020818152604080832080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff1790558051603880825260608201909252918201818036833750505060a0860151909150610e7a90829086903090611149565b8115610ebc577fb8bad102ac8bbacfef31ff1c906ec6d951c230b4dce750bb0376b812ad35852a81604051610eaf9190611790565b60405180910390a1610f0b565b3373ffffffffffffffffffffffffffffffffffffffff167f195271068a288191e4b265c641a56b9832919f69e9e7d6c2f31ba40278aeb85a82604051610f029190611790565b60405180910390a25b6040517f2479fb6e00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690632479fb6e90610f80908590600401611790565b6020604051808303816000875af1158015610f9f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fc391906117a3565b90506000808760600151838960e001510281610fe157610fe16117bc565b048860e00151039050808389606001510301915050804710156110a4576040517f2e1a7d4d00000000000000000000000000000000000000000000000000000000815247820360048201819052907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690632e1a7d4d90602401600060405180830381600087803b15801561108a57600080fd5b505af115801561109e573d6000803e3d6000fd5b50505050505b845160405160009173ffffffffffffffffffffffffffffffffffffffff169083908381818185875af1925050503d80600081146110fd576040519150601f19603f3d011682016040523d82523d6000602084013e611102565b606091505b505090508061113d576040517f6d963f8800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050505050505050565b60388451146111b4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f475076323a2075696420627566666572206f766572666c6f77000000000000006044820152606401610698565b60388401526034830152602090910152565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff81118282101715611219576112196111c6565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611266576112666111c6565b604052919050565b6000806040838503121561128157600080fd5b8235915060208084013567ffffffffffffffff808211156112a157600080fd5b818601915086601f8301126112b557600080fd5b8135818111156112c7576112c76111c6565b6112f7847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161121f565b9150808252878482850101111561130d57600080fd5b80848401858401376000848284010152508093505050509250929050565b6000610120828403121561133e57600080fd5b50919050565b6000806020838503121561135757600080fd5b823567ffffffffffffffff8082111561136f57600080fd5b818501915085601f83011261138357600080fd5b81358181111561139257600080fd5b866020610120830285010111156113a857600080fd5b60209290920196919550909350505050565b6000602082840312156113cc57600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156103d8576103d86113d3565b803563ffffffff8116811461142957600080fd5b919050565b60006020828403121561144057600080fd5b61144982611415565b9392505050565b8035600781900b811461142957600080fd5b60006020828403121561147457600080fd5b61144982611450565b803573ffffffffffffffffffffffffffffffffffffffff8116811461142957600080fd5b8035801515811461142957600080fd5b600061012082840312156114c457600080fd5b6114cc6111f5565b6114d58361147d565b81526114e36020840161147d565b602082015260408301356040820152606083013560608201526080830135608082015260a083013560a082015261151c60c08401611415565b60c082015261152d60e084016114a1565b60e0820152610100611540818501611450565b908201529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036115ab576115ab6113d3565b5060010190565b6000815180845260005b818110156115d8576020818501810151868301820152016115bc565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b6000815160028110611651577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8084525060208201516040602085015261166e60408501826115b2565b949350505050565b835173ffffffffffffffffffffffffffffffffffffffff16815260006101c060208601516116bc602085018273ffffffffffffffffffffffffffffffffffffffff169052565b5060408601516116e4604085018273ffffffffffffffffffffffffffffffffffffffff169052565b50606086015160608401526080860151608084015260a086015161171060a085018263ffffffff169052565b5060c086015160c084015260e086015160e0840152610100808701518185015250610120808701516117458286018215159052565b505061014086810151908401526101608087015190840152610180830181905261177181840186611616565b90508281036101a084015261178681856115b2565b9695505050505050565b60208152600061144960208301846115b2565b6000602082840312156117b557600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea2646970667358221220dd6ac68dca08d6be1c4da0e828b663868839c2a8d206f54f6cae8f64c576247564736f6c63430008100033";

export class CoWSwapEthFlow__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _cowSwapSettlement: string,
    _wrappedNativeToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CoWSwapEthFlow> {
    return super.deploy(
      _cowSwapSettlement,
      _wrappedNativeToken,
      overrides || {}
    ) as Promise<CoWSwapEthFlow>;
  }
  getDeployTransaction(
    _cowSwapSettlement: string,
    _wrappedNativeToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _cowSwapSettlement,
      _wrappedNativeToken,
      overrides || {}
    );
  }
  attach(address: string): CoWSwapEthFlow {
    return super.attach(address) as CoWSwapEthFlow;
  }
  connect(signer: Signer): CoWSwapEthFlow__factory {
    return super.connect(signer) as CoWSwapEthFlow__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CoWSwapEthFlowInterface {
    return new utils.Interface(_abi) as CoWSwapEthFlowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CoWSwapEthFlow {
    return new Contract(address, _abi, signerOrProvider) as CoWSwapEthFlow;
  }
}
