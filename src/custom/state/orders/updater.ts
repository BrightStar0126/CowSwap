import { useCallback, useEffect, useRef } from 'react'
import { useActiveWeb3React } from 'hooks'
import { OrderFulfillmentData, Order } from './actions'
import { usePendingOrders, useFulfillOrdersBatch, useExpireOrdersBatch, useCancelOrdersBatch } from './hooks'
import { getOrder, OrderID, OrderMetaData } from 'utils/operator'
import { SHORT_PRECISION, EXPIRED_ORDERS_BUFFER } from 'constants/index'
import { stringToCurrency } from '../swap/extension'
import { OPERATOR_API_POLL_INTERVAL } from './consts'
import { ChainId } from '@uniswap/sdk'

type OrderLogPopupMixData = OrderFulfillmentData | OrderID

function _computeFulfilledSummary({
  orderFromStore,
  orderFromApi
}: {
  orderFromStore?: Order
  orderFromApi: OrderMetaData | null
}) {
  // Default to store's current order summary
  let summary: string | undefined = orderFromStore?.summary

  // if we can find the order from the API
  // and our specific order exists in our state, let's use that
  if (orderFromApi) {
    const { buyToken, sellToken, executedBuyAmount, executedSellAmount } = orderFromApi

    if (orderFromStore) {
      const { inputToken, outputToken } = orderFromStore
      // don't show amounts in atoms
      const inputAmount = stringToCurrency(executedSellAmount, inputToken)
      const outputAmount = stringToCurrency(executedBuyAmount, outputToken)

      summary = `Swap ${inputAmount.toSignificant(SHORT_PRECISION)} ${
        inputAmount.currency.symbol
      } for ${outputAmount.toSignificant(SHORT_PRECISION)} ${outputAmount.currency.symbol}`
    } else {
      // We only have the API order info, let's at least use that
      summary = `Swap ${sellToken} for ${buyToken}`
    }
  } else {
    console.log(`[state:orders:updater] computeFulfilledSummary::API data not yet in sync with blockchain`)
  }

  return summary
}

type ApiOrderStatus = 'unknown' | 'fulfilled' | 'expired' | 'cancelled' | 'pending'

function classifyOrder(order: OrderMetaData | null): ApiOrderStatus {
  if (!order) {
    return 'unknown'
  } else if (Number(order.executedBuyAmount) > 0 && Number(order.executedSellAmount) > 0) {
    // TODO: Assume orders are fillOrKill
    // TODO: calculation changes for partial fill orders
    return 'fulfilled'
  } else if (order.invalidated && new Date(order.creationDate).getTime() + EXPIRED_ORDERS_BUFFER < Date.now()) {
    return 'cancelled'
  } else if (order.validTo * 1000 + EXPIRED_ORDERS_BUFFER < Date.now()) {
    return 'expired'
  }
  return 'pending'
}

type PopupData = {
  status: ApiOrderStatus
  popupData?: OrderLogPopupMixData
}

async function fetchOrderPopupData(orderFromStore: Order, chainId: ChainId): Promise<PopupData> {
  const orderFromApi = await getOrder(chainId, orderFromStore.id)

  const status = classifyOrder(orderFromApi)

  let popupData = undefined

  switch (status) {
    case 'fulfilled':
      popupData = {
        id: orderFromStore.id,
        fulfillmentTime: new Date().toISOString(),
        transactionHash: '', // there's no need  for a txHash as we'll link the notification to the Explorer
        summary: _computeFulfilledSummary({ orderFromStore, orderFromApi })
      }
      break
    case 'expired':
    case 'cancelled':
      popupData = orderFromStore.id
      break
    default:
      // No popup for other states
      break
  }

  return { status, popupData }
}

export function EventUpdater(): null {
  const { chainId } = useActiveWeb3React()

  const pending = usePendingOrders({ chainId })

  // Ref, so we don't rerun useEffect
  const pendingRef = useRef(pending)
  pendingRef.current = pending

  const fulfillOrdersBatch = useFulfillOrdersBatch()
  const expireOrdersBatch = useExpireOrdersBatch()
  const cancelOrdersBatch = useCancelOrdersBatch()

  const updateOrders = useCallback(
    async (chainId: ChainId) => {
      // Exit early when there are no pending orders
      if (pendingRef.current.length === 0) {
        return
      }

      // Iterate over pending orders fetching operator order data, async
      const unfilteredOrdersData = await Promise.all(
        pendingRef.current.map(async orderFromStore => fetchOrderPopupData(orderFromStore, chainId))
      )

      // Group resolved promises by status
      // Only pick the status that are final
      const { fulfilled, expired, cancelled } = unfilteredOrdersData.reduce<
        Record<ApiOrderStatus, OrderLogPopupMixData[]>
      >(
        (acc, { status, popupData }) => {
          popupData && acc[status].push(popupData)
          return acc
        },
        { fulfilled: [], expired: [], cancelled: [], unknown: [], pending: [] }
      )

      // Bach state update per group, if any

      fulfilled.length > 0 &&
        fulfillOrdersBatch({
          ordersData: fulfilled as OrderFulfillmentData[],
          chainId
        })
      expired.length > 0 &&
        expireOrdersBatch({
          ids: expired as OrderID[],
          chainId
        })
      cancelled.length > 0 &&
        cancelOrdersBatch({
          ids: cancelled as OrderID[],
          chainId
        })
    },
    [cancelOrdersBatch, expireOrdersBatch, fulfillOrdersBatch]
  )

  useEffect(() => {
    if (!chainId) {
      return
    }

    const interval = setInterval(() => updateOrders(chainId), OPERATOR_API_POLL_INTERVAL)

    return () => clearInterval(interval)

export function ExpiredOrdersWatcher(): null {
  const { chainId } = useActiveWeb3React()

  const expireOrdersBatch = useExpireOrdersBatch()

  const pendingOrders = usePendingOrders({ chainId })

  // ref, so we don't rerun useEffect
  const pendingOrdersRef = useRef(pendingOrders)
  pendingOrdersRef.current = pendingOrders

  useEffect(() => {
    if (!chainId) return

    const checkForExpiredOrders = () => {
      // no more pending orders
      // but don't clearInterval so we can restart when there are new orders
      if (pendingOrdersRef.current.length === 0) return

      const expiredOrders = pendingOrdersRef.current.filter(order => {
        // validTo is either a Date or unix timestamp in seconds
        const validTo = typeof order.validTo === 'number' ? new Date(order.validTo * 1000) : order.validTo

        // let's get the current date, with our expired order validTo given a buffer time
        return Date.now() - validTo.valueOf() > EXPIRED_ORDERS_BUFFER
      })

      const expiredIds = expiredOrders.map(({ id }) => id)

      expireOrdersBatch({
        chainId,
        ids: expiredIds
      })
    }

    const intervalId = setInterval(checkForExpiredOrders, CHECK_EXPIRED_ORDERS_INTERVAL)

    return () => clearInterval(intervalId)
  }, [chainId, expireOrdersBatch])
  }, [chainId, updateOrders])

  return null
}
