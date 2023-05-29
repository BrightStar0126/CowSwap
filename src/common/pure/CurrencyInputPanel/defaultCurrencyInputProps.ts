import { CurrencyInputPanelProps } from 'common/pure/CurrencyInputPanel/index'
import { Field } from 'legacy/state/swap/actions'
import { CurrencyAmount, Percent } from '@uniswap/sdk-core'
import { COW } from 'legacy/constants/tokens'
import { SupportedChainId } from '@cowprotocol/cow-sdk'
import { PriceImpact } from 'legacy/hooks/usePriceImpact'

const currency = COW[SupportedChainId.MAINNET]
const balance = CurrencyAmount.fromRawAmount(currency, 250 * 10 ** 18)

export const defaultCurrencyInputPanelProps: CurrencyInputPanelProps & { priceImpactParams: PriceImpact } = {
  chainId: 5,
  id: 'currency-panel',
  areCurrenciesLoading: false,
  showSetMax: true,
  allowsOffchainSigning: true,
  currencyInfo: {
    field: Field.INPUT,
    isIndependent: false,
    receiveAmountInfo: {
      type: 'from',
      amountBeforeFees: '30',
      amountAfterFees: '20',
      amountAfterFeesRaw: CurrencyAmount.fromRawAmount(currency, 20 * 10 ** 18),
      feeAmount: '10',
      feeAmountRaw: CurrencyAmount.fromRawAmount(currency, 10 * 10 ** 18),
    },
    currency,
    balance,
    amount: CurrencyAmount.fromRawAmount(currency, 20 * 10 ** 18),
    fiatAmount: CurrencyAmount.fromRawAmount(currency, 12 * 10 ** 18),
  },
  onCurrencySelection() {
    /**/
  },
  onUserInput() {
    /**/
  },
  priceImpactParams: {
    priceImpact: new Percent(2, 10_000),
    loading: false,
    error: 'fetch-quote-error',
  },
  subsidyAndBalance: {
    subsidy: {
      tier: 2,
      discount: 10,
    },
    balance,
  },
}
