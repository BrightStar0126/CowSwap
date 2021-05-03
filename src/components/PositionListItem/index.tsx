import React, { useMemo, useState } from 'react'
import { Position } from '@uniswap/v3-sdk'
import Badge, { BadgeVariant } from 'components/Badge'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { usePool } from 'hooks/usePools'
import { useToken } from 'hooks/Tokens'
import { AlertCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'
import { PositionDetails } from 'types/position'
import { WETH9, Price, Token, Percent } from '@uniswap/sdk-core'
import { formatPrice } from 'utils/formatTokenAmount'
import Loader from 'components/Loader'
import { unwrappedToken } from 'utils/wrappedCurrency'
import { DAI, USDC, USDT, WBTC } from '../../constants'
import { MouseoverTooltip } from '../Tooltip'
import { RowFixed } from 'components/Row'

const ActiveDot = styled.span`
  background-color: ${({ theme }) => theme.success};
  border-radius: 50%;
  height: 8px;
  width: 8px;
  margin-right: 4px;
`
const Row = styled(Link)`
  align-items: center;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.text1};
  margin: 8px 0;
  padding: 16px;
  text-decoration: none;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg1};

  &:first-of-type {
    margin: 0 0 8px 0;
  }
  &:last-of-type {
    margin: 8px 0 0 0;
  }
  & > div:not(:first-child) {
    text-align: right;
  }
  :hover {
    background-color: ${({ theme }) => theme.bg2};
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: row;
  }
`
const BadgeText = styled.div`
  font-weight: 500;
  font-size: 14px;
`
const BadgeWrapper = styled.div`
  font-size: 14px;
`
const DataLineItem = styled.div`
  font-size: 14px;
`

const RangeLineItem = styled(DataLineItem)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-self: flex-end;
`

const DoubleArrow = styled.span`
  color: ${({ theme }) => theme.text3};
`

const RangeText = styled.span`
  background-color: ${({ theme }) => theme.bg2};
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
`

const ExtentsText = styled.span`
  color: ${({ theme }) => theme.text3};
  font-size: 14px;
  margin-right: 4px;
`

const PrimaryPositionIdData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin-right: 8px;
  }
`

const DataText = styled.div`
  font-weight: 600;
  font-size: 18px;
`

export interface PositionListItemProps {
  positionDetails: PositionDetails
}

export function getPriceOrderingFromPositionForUI(
  position?: Position
): {
  priceLower?: Price
  priceUpper?: Price
  quote?: Token
  base?: Token
} {
  if (!position) {
    return {}
  }

  const token0 = position.amount0.token
  const token1 = position.amount1.token

  // if token0 is a dollar-stable asset, set it as the quote token
  const stables = [DAI, USDC, USDT]
  if (stables.some((stable) => stable.equals(token0))) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1,
    }
  }

  // if token1 is an ETH-/BTC-stable asset, set it as the base token
  const bases = [...Object.values(WETH9), WBTC]
  if (bases.some((base) => base.equals(token1))) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1,
    }
  }

  // if both prices are below 1, invert
  if (position.token0PriceUpper.lessThan(1)) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1,
    }
  }

  // otherwise, just return the default
  return {
    priceLower: position.token0PriceLower,
    priceUpper: position.token0PriceUpper,
    quote: token1,
    base: token0,
  }
}

export default function PositionListItem({ positionDetails }: PositionListItemProps) {
  const { t } = useTranslation()

  const {
    token0: token0Address,
    token1: token1Address,
    fee: feeAmount,
    liquidity,
    tickLower,
    tickUpper,
  } = positionDetails

  const token0 = useToken(token0Address)
  const token1 = useToken(token1Address)

  const currency0 = token0 ? unwrappedToken(token0) : undefined
  const currency1 = token1 ? unwrappedToken(token1) : undefined

  // construct Position from details returned
  const [, pool] = usePool(currency0 ?? undefined, currency1 ?? undefined, feeAmount)

  const position = useMemo(() => {
    if (pool) {
      return new Position({ pool, liquidity: liquidity.toString(), tickLower, tickUpper })
    }
    return undefined
  }, [liquidity, pool, tickLower, tickUpper])

  // prices
  let { priceLower, priceUpper, base, quote } = getPriceOrderingFromPositionForUI(position)
  const inverted = token1 ? base?.equals(token1) : undefined
  const currencyQuote = inverted ? currency0 : currency1
  const currencyBase = inverted ? currency1 : currency0

  // check if price is within range
  const outOfRange: boolean = pool ? pool.tickCurrent < tickLower || pool.tickCurrent >= tickUpper : false

  const positionSummaryLink = '/pool/' + positionDetails.tokenId

  const [manuallyInverted, setManuallyInverted] = useState(true)
  if (manuallyInverted) {
    ;[priceLower, priceUpper, base, quote] = [priceUpper?.invert(), priceLower?.invert(), quote, base]
  }

  const quotePrice = useMemo(() => {
    return manuallyInverted
      ? position?.pool.priceOf(position?.pool.token0)
      : position?.pool.priceOf(position?.pool.token1)
  }, [manuallyInverted, position?.pool])

  return (
    <Row to={positionSummaryLink}>
      <RowFixed>
        <PrimaryPositionIdData>
          <DoubleCurrencyLogo currency0={currencyBase} currency1={currencyQuote} size={18} margin />
          <DataText>
            &nbsp;{currencyQuote?.symbol}&nbsp;/&nbsp;{currencyBase?.symbol}
          </DataText>
          &nbsp;
          <Badge>
            <BadgeText>{new Percent(feeAmount, 1_000_000).toSignificant()}%</BadgeText>
          </Badge>
        </PrimaryPositionIdData>
        <BadgeWrapper>
          {outOfRange ? (
            <MouseoverTooltip
              text={`The price of this pair is outside of your selected range. Your positions is not earning fees. Current price: ${quotePrice?.toSignificant(
                6
              )} ${manuallyInverted ? currencyQuote?.symbol : currencyBase?.symbol} / ${
                manuallyInverted ? currencyBase?.symbol : currencyQuote?.symbol
              }`}
            >
              <Badge variant={BadgeVariant.WARNING}>
                <AlertCircle width={14} height={14} style={{ marginRight: '' }} />
                &nbsp;
                <BadgeText>{t('Out of range')}</BadgeText>
              </Badge>
            </MouseoverTooltip>
          ) : (
            <MouseoverTooltip
              text={`The price of this pair is within your selected range. Your positions is earning fees. Current price: ${quotePrice?.toSignificant(
                6
              )} ${manuallyInverted ? currencyQuote?.symbol : currencyBase?.symbol} / ${
                manuallyInverted ? currencyBase?.symbol : currencyQuote?.symbol
              }`}
            >
              <Badge variant={BadgeVariant.DEFAULT}>
                <ActiveDot /> &nbsp;
                <BadgeText>{t('In range')}</BadgeText>
              </Badge>
            </MouseoverTooltip>
          )}
        </BadgeWrapper>
      </RowFixed>

      {priceLower && priceUpper ? (
        <>
          {' '}
          <RangeLineItem
            onClick={(e) => {
              e.stopPropagation()
              setManuallyInverted(!manuallyInverted)
            }}
          >
            <span>
              <RangeText>
                <ExtentsText>Min: </ExtentsText>
                {formatPrice(priceLower, 4)} {manuallyInverted ? currencyQuote?.symbol : currencyBase?.symbol} {' / '}{' '}
                {manuallyInverted ? currencyBase?.symbol : currencyQuote?.symbol}
              </RangeText>{' '}
              <DoubleArrow>⟷</DoubleArrow>{' '}
              <RangeText>
                <ExtentsText>Max:</ExtentsText>
                {formatPrice(priceUpper, 4)} {manuallyInverted ? currencyQuote?.symbol : currencyBase?.symbol} {' / '}{' '}
                {manuallyInverted ? currencyBase?.symbol : currencyQuote?.symbol}
              </RangeText>{' '}
            </span>
          </RangeLineItem>
        </>
      ) : (
        <Loader />
      )}
    </Row>
  )
}
