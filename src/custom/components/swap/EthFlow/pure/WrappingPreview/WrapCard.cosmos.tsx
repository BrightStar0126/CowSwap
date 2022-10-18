import { WrapCard } from './WrapCard'

import { WRAPPED_NATIVE_CURRENCY as WETH } from 'constants/tokens'
import { SupportedChainId } from 'constants/chains'
import { CurrencyAmount } from '@uniswap/sdk-core'

const WrappedEther = WETH[SupportedChainId.GOERLI]
const wrapAmount = CurrencyAmount.fromRawAmount(WrappedEther, 5.21456 * 10 ** 18)
const balance = CurrencyAmount.fromRawAmount(WrappedEther, 15.12123 * 10 ** 18)

export default <WrapCard currency={WrappedEther} amountToWrap={wrapAmount} balance={balance} />
