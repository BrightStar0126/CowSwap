import { useWeb3React } from '@web3-react/core'
import * as styledEl from './styled'
import { Field } from 'state/swap/actions'
import { CurrencyInputPanel } from '@cow/common/pure/CurrencyInputPanel'
import { CurrencyArrowSeparator } from '@cow/common/pure/CurrencyArrowSeparator'
import { AddRecipient } from '@cow/common/pure/AddRecipient'
import React, { useCallback, useMemo, useState } from 'react'
import { BalanceAndSubsidy } from 'hooks/useCowBalanceAndSubsidy'
import { CurrencyInfo } from '@cow/common/pure/CurrencyInputPanel/types'
import { useLimitOrdersTradeState } from '../../hooks/useLimitOrdersTradeState'
import { limitOrdersAtom, updateLimitOrdersAtom } from '../../state/limitOrdersAtom'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { SettingsWidget } from '../SettingsWidget'
import { limitOrdersSettingsAtom } from '../../state/limitOrdersSettingsAtom'
import { RateInput } from '../RateInput'
import { DeadlineInput } from '../DeadlineInput'
import { useUpdateCurrencyAmount } from '../../hooks/useUpdateCurrencyAmount'
import { LimitOrdersConfirmModal } from '../LimitOrdersConfirmModal'
import { useTradeFlowContext } from '../../hooks/useTradeFlowContext'
import { useIsSellOrder } from '../../hooks/useIsSellOrder'
import { TradeButtons } from '@cow/modules/limitOrders/containers/TradeButtons'
import { TradeApproveWidget } from '@cow/common/containers/TradeApprove/TradeApproveWidget'
import { useSetupTradeState } from '@cow/modules/trade'
import { useTradeNavigate } from '@cow/modules/trade/hooks/useTradeNavigate'
import { useOnCurrencySelection } from '@cow/modules/trade/hooks/useOnCurrencySelection'
import { ImportTokenModal } from '@cow/modules/trade/containers/ImportTokenModal'
import { useOnImportDismiss } from '@cow/modules/trade/hooks/useOnImportDismiss'
import { limitRateAtom } from '../../state/limitRateAtom'
import { TradeWidgetLinks } from '@cow/modules/application/containers/TradeWidgetLinks'
import { useDisableNativeTokenSelling } from '@cow/modules/limitOrders/hooks/useDisableNativeTokenSelling'
import { useRateInfoParams } from '@cow/common/hooks/useRateInfoParams'
import { UnlockLimitOrders } from '../../pure/UnlockLimitOrders'
import usePriceImpact from 'hooks/usePriceImpact'
import { LimitOrdersWarnings } from '@cow/modules/limitOrders/containers/LimitOrdersWarnings'
import { useLimitOrdersPriceImpactParams } from '@cow/modules/limitOrders/hooks/useLimitOrdersPriceImpactParams'
import { OrderKind } from '@cowprotocol/contracts'
import { useThrottleFn } from '@cow/common/hooks/useThrottleFn'
import { useWalletInfo } from 'hooks/useWalletInfo'
import { useDetectNativeToken } from '@cow/modules/swap/hooks/useDetectNativeToken'

export function LimitOrdersWidget() {
  useSetupTradeState()
  useDisableNativeTokenSelling()

  const { chainId } = useWeb3React()
  const { allowsOffchainSigning } = useWalletInfo()
  const {
    inputCurrency,
    outputCurrency,
    inputCurrencyAmount,
    outputCurrencyAmount,
    inputCurrencyBalance,
    outputCurrencyBalance,
    inputCurrencyFiatAmount,
    outputCurrencyFiatAmount,
    recipient,
    isUnlocked,
  } = useLimitOrdersTradeState()
  const onCurrencySelection = useOnCurrencySelection()
  const onImportDismiss = useOnImportDismiss()
  const limitOrdersNavigate = useTradeNavigate()
  const settingState = useAtomValue(limitOrdersSettingsAtom)
  const updateCurrencyAmount = useUpdateCurrencyAmount()
  const isSellOrder = useIsSellOrder()
  const tradeContext = useTradeFlowContext()
  const state = useAtomValue(limitOrdersAtom)
  const updateLimitOrdersState = useUpdateAtom(updateLimitOrdersAtom)
  const { isLoading: isRateLoading } = useAtomValue(limitRateAtom)
  const rateInfoParams = useRateInfoParams(inputCurrencyAmount, outputCurrencyAmount)
  const { isWrapOrUnwrap } = useDetectNativeToken()

  const [showConfirmation, setShowConfirmation] = useState(false)

  const currenciesLoadingInProgress = false
  const isTradePriceUpdating = isRateLoading
  const showSetMax = true

  const showRecipient = useMemo(
    () => !isWrapOrUnwrap && settingState.showRecipient,
    [settingState.showRecipient, isWrapOrUnwrap]
  )
  const priceImpact = usePriceImpact(useLimitOrdersPriceImpactParams())
  const subsidyAndBalance: BalanceAndSubsidy = {
    subsidy: {
      tier: 0,
      discount: 0,
    },
  }
  const inputCurrencyInfo: CurrencyInfo = {
    field: Field.INPUT,
    label: isWrapOrUnwrap ? undefined : isSellOrder ? 'You sell' : 'You sell at most',
    currency: inputCurrency,
    rawAmount: inputCurrencyAmount,
    viewAmount: inputCurrencyAmount?.toExact() || '',
    balance: inputCurrencyBalance,
    fiatAmount: inputCurrencyFiatAmount,
    receiveAmountInfo: null,
  }
  const outputCurrencyInfo: CurrencyInfo = {
    field: Field.OUTPUT,
    label: isWrapOrUnwrap ? undefined : isSellOrder ? 'Your receive at least' : 'You receive exactly',
    currency: outputCurrency,
    rawAmount: isWrapOrUnwrap ? inputCurrencyAmount : outputCurrencyAmount,
    viewAmount: isWrapOrUnwrap ? inputCurrencyAmount?.toExact() || '' : outputCurrencyAmount?.toExact() || '',
    balance: outputCurrencyBalance,
    fiatAmount: outputCurrencyFiatAmount,
    receiveAmountInfo: null,
  }
  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      if (isWrapOrUnwrap) {
        updateCurrencyAmount({ inputCurrencyAmount: typedValue })
        return
      }

      if (field === Field.INPUT) {
        updateCurrencyAmount({ inputCurrencyAmount: typedValue })
      } else {
        updateCurrencyAmount({ outputCurrencyAmount: typedValue })
      }
    },
    [updateCurrencyAmount, isWrapOrUnwrap]
  )

  const onSwitchTokens = useCallback(() => {
    const { inputCurrencyId, outputCurrencyId } = state

    if (!isWrapOrUnwrap) {
      updateLimitOrdersState({
        inputCurrencyAmount: outputCurrencyAmount?.toExact(),
        outputCurrencyAmount: null,
        orderKind: OrderKind.SELL,
      })
    }
    limitOrdersNavigate(chainId, { inputCurrencyId: outputCurrencyId, outputCurrencyId: inputCurrencyId })
  }, [state, isWrapOrUnwrap, limitOrdersNavigate, updateLimitOrdersState, chainId, outputCurrencyAmount])
  // Disable too frequent tokens switching
  const throttledOnSwitchTokens = useThrottleFn(onSwitchTokens, 500)

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      updateLimitOrdersState({ recipient })
    },
    [updateLimitOrdersState]
  )

  console.debug('RENDER LIMIT ORDERS WIDGET', { inputCurrencyInfo, outputCurrencyInfo })

  return (
    <>
      <styledEl.Container>
        <styledEl.ContainerBox>
          <styledEl.Header>
            <TradeWidgetLinks />
            {isUnlocked && <SettingsWidget />}
          </styledEl.Header>

          {isUnlocked ? (
            <>
              <CurrencyInputPanel
                id="swap-currency-input"
                disableNonToken={false}
                chainId={chainId}
                loading={currenciesLoadingInProgress}
                onCurrencySelection={onCurrencySelection}
                onUserInput={onUserInput}
                subsidyAndBalance={subsidyAndBalance}
                allowsOffchainSigning={allowsOffchainSigning}
                currencyInfo={inputCurrencyInfo}
                showSetMax={showSetMax}
                topLabel={inputCurrencyInfo.label}
              />
              {!isWrapOrUnwrap && (
                <styledEl.RateWrapper>
                  <RateInput />
                  <DeadlineInput />
                </styledEl.RateWrapper>
              )}
              <styledEl.CurrencySeparatorBox withRecipient={showRecipient}>
                <CurrencyArrowSeparator
                  isCollapsed={false}
                  onSwitchTokens={throttledOnSwitchTokens}
                  withRecipient={showRecipient}
                  isLoading={isTradePriceUpdating}
                  hasSeparatorLine={true}
                />
                {showRecipient && recipient === null && <AddRecipient onChangeRecipient={onChangeRecipient} />}
              </styledEl.CurrencySeparatorBox>
              <CurrencyInputPanel
                id="swap-currency-output"
                disableNonToken={false}
                chainId={chainId}
                loading={currenciesLoadingInProgress}
                isRateLoading={isRateLoading}
                onCurrencySelection={onCurrencySelection}
                onUserInput={onUserInput}
                subsidyAndBalance={subsidyAndBalance}
                allowsOffchainSigning={allowsOffchainSigning}
                currencyInfo={outputCurrencyInfo}
                priceImpactParams={priceImpact}
                topLabel={outputCurrencyInfo.label}
              />
              {recipient !== null && (
                <styledEl.StyledRemoveRecipient recipient={recipient} onChangeRecipient={onChangeRecipient} />
              )}

              {!isWrapOrUnwrap && <styledEl.StyledRateInfo rateInfoParams={rateInfoParams} />}

              <LimitOrdersWarnings priceImpact={priceImpact} />

              <styledEl.TradeButtonBox>
                <TradeButtons
                  inputCurrencyAmount={inputCurrencyAmount}
                  tradeContext={tradeContext}
                  priceImpact={priceImpact}
                  openConfirmScreen={() => setShowConfirmation(true)}
                />
              </styledEl.TradeButtonBox>
            </>
          ) : (
            <UnlockLimitOrders handleUnlock={() => updateLimitOrdersState({ isUnlocked: true })} />
          )}
        </styledEl.ContainerBox>
      </styledEl.Container>
      <TradeApproveWidget />
      {tradeContext && (
        <LimitOrdersConfirmModal
          isOpen={showConfirmation}
          tradeContext={tradeContext}
          priceImpact={priceImpact}
          inputCurrencyInfo={inputCurrencyInfo}
          outputCurrencyInfo={outputCurrencyInfo}
          onDismiss={() => setShowConfirmation(false)}
        />
      )}
      {chainId && <ImportTokenModal chainId={chainId} onDismiss={onImportDismiss} />}
    </>
  )
}
