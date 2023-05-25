import * as styledEl from './styled'
import { CurrencySelectButton } from 'modules/swap/pure/CurrencySelectButton'
import { FiatValue } from 'legacy/components/CurrencyInputPanel/FiatValue/FiatValueMod'
import { Trans } from '@lingui/macro'
import { PriceImpact } from 'legacy/hooks/usePriceImpact'
import { CurrencyInfo } from 'common/pure/CurrencyInputPanel/types'
import { TokenAmount } from 'common/pure/TokenAmount'
import { DemoContainer } from 'cosmos.decorator'

interface BuiltItProps {
  className: string
}

export interface CurrencyPreviewProps extends Partial<BuiltItProps> {
  id: string
  currencyInfo: CurrencyInfo
  priceImpactParams?: PriceImpact
  topLabel?: string
}

export function CurrencyPreview(props: CurrencyPreviewProps) {
  const { id, currencyInfo, className, priceImpactParams, topLabel } = props
  const { priceImpact, loading: priceImpactLoading } = priceImpactParams || {}
  const { currency, balance, fiatAmount, amount } = currencyInfo

  return (
    <DemoContainer>
      <styledEl.Wrapper id={id} className={className} withReceiveAmountInfo={false} disabled={false}>
        {topLabel && <styledEl.CurrencyTopLabel>{topLabel}</styledEl.CurrencyTopLabel>}

        <styledEl.CurrencyInputBox>
          <div>
            <CurrencySelectButton currency={currency || undefined} loading={false} readonlyMode={true} />
          </div>
          <div>
            <styledEl.TokenAmountStyled className="token-amount-input" amount={amount} />
          </div>
        </styledEl.CurrencyInputBox>

        <styledEl.CurrencyInputBox>
          <div>
            {balance && (
              <>
                <styledEl.BalanceText>
                  <Trans>Balance</Trans>: <TokenAmount amount={balance} defaultValue="0" tokenSymbol={currency} />
                </styledEl.BalanceText>
              </>
            )}
          </div>
          <div>
            <styledEl.FiatAmountText>
              <FiatValue priceImpactLoading={priceImpactLoading} fiatValue={fiatAmount} priceImpact={priceImpact} />
            </styledEl.FiatAmountText>
          </div>
        </styledEl.CurrencyInputBox>
      </styledEl.Wrapper>
    </DemoContainer>
  )
}
