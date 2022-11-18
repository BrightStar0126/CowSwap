import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useUpdateAtom } from 'jotai/utils'
import { Fraction } from '@uniswap/sdk-core'
import JSBI from 'jsbi'

import { SimpleGetQuoteResponse } from '@cowprotocol/cow-sdk'
import { useLimitOrdersTradeState } from '@cow/modules/limitOrders/hooks/useLimitOrdersTradeState'
import { updateLimitRateAtom } from '@cow/modules/limitOrders/state/limitRateAtom'
import { limitOrdersQuoteAtom } from '@cow/modules/limitOrders/state/limitOrdersQuoteAtom'
import { getDecimals } from '@cow/modules/limitOrders/utils/getDecimals'
import { CancelableResult } from 'utils/async'

export function useHandleResponse() {
  const updateLimitRateState = useUpdateAtom(updateLimitRateAtom)

  const { inputCurrency, outputCurrency } = useLimitOrdersTradeState()
  const setLimitOrdersQuote = useSetAtom(limitOrdersQuoteAtom)

  return useCallback(
    (response: CancelableResult<SimpleGetQuoteResponse>) => {
      const { cancelled, data } = response

      try {
        if (cancelled) {
          return
        }

        const { buyAmount, sellAmount } = data.quote

        if (!outputCurrency || !inputCurrency) {
          return
        }

        // Adjust for decimals
        const adjustedBuy = JSBI.multiply(JSBI.BigInt(buyAmount), JSBI.BigInt(10 ** getDecimals(inputCurrency)))
        const adjustedSell = JSBI.multiply(JSBI.BigInt(sellAmount), JSBI.BigInt(10 ** getDecimals(outputCurrency)))

        // Create executionRate fraction
        const executionRate = new Fraction(adjustedBuy, adjustedSell)

        // Update the rate state
        updateLimitRateState({ executionRate })

        // Update limit order quote
        setLimitOrdersQuote({ response: data })
      } catch (error) {
        console.debug('[useFetchMarketPrice] Failed to fetch exection price', error)
        updateLimitRateState({ executionRate: null })
      }
    },
    [inputCurrency, outputCurrency, setLimitOrdersQuote, updateLimitRateState]
  )
}
