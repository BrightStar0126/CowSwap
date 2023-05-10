import { renderHook } from '@testing-library/react-hooks'
import { useHandleSwap } from './useHandleSwap'
import { PriceImpact } from 'hooks/usePriceImpact'
import { useSwapActionHandlers } from 'state/swap/hooks'
import { swapFlow } from '@cow/modules/swap/services/swapFlow'
import { ethFlow } from '@cow/modules/swap/services/ethFlow'
import { useSwapFlowContext } from './useSwapFlowContext'
import { useEthFlowContext } from './useEthFlowContext'
import { withModalProvider } from '@cow/utils/withModalProvider'
import { useSafeBundleFlowContext } from '@cow/modules/swap/hooks/useSafeBundleFlowContext'
import { safeBundleFlow } from '@cow/modules/swap/services/safeBundleFlow'

jest.mock('./useSwapFlowContext')
jest.mock('./useEthFlowContext')
jest.mock('./useSafeBundleFlowContext')
jest.mock('state/swap/hooks')
jest.mock('@cow/modules/swap/services/swapFlow')
jest.mock('@cow/modules/swap/services/ethFlow')
jest.mock('@cow/modules/swap/services/safeBundleFlow')
jest.mock('@cow/modules/swap/state/transactionConfirmAtom')

const mockUseSwapActionHandlers = useSwapActionHandlers as jest.MockedFunction<typeof useSwapActionHandlers>
const mockSwapFlow = swapFlow as jest.MockedFunction<typeof swapFlow>
const mockEthFlow = ethFlow as jest.MockedFunction<typeof ethFlow>
const mockSafeBundleFlow = safeBundleFlow as jest.MockedFunction<typeof safeBundleFlow>
const mockUseSwapFlowContext = useSwapFlowContext as jest.MockedFunction<typeof useSwapFlowContext>
const mockUseEthFlowContext = useEthFlowContext as jest.MockedFunction<typeof useEthFlowContext>
const mockUseSafeBundleFlowContext = useSafeBundleFlowContext as jest.MockedFunction<typeof useSafeBundleFlowContext>

const priceImpactMock: PriceImpact = {
  priceImpact: undefined,
  error: undefined,
  loading: false,
}
describe('useHandleSwapCallback', () => {
  let onChangeRecipient: jest.Mock

  beforeEach(() => {
    onChangeRecipient = jest.fn()

    mockUseSwapActionHandlers.mockReturnValue({ onChangeRecipient } as any)
    mockUseSwapFlowContext.mockReturnValue(1 as any)
    mockUseEthFlowContext.mockReturnValue(1 as any)
    mockUseSafeBundleFlowContext.mockReturnValue(1 as any)

    mockSwapFlow.mockImplementation(() => Promise.resolve())
    mockEthFlow.mockImplementation(() => Promise.resolve())
    mockSafeBundleFlow.mockImplementation(() => Promise.resolve())
  })

  it('When a swap happened, then the recipient value should be deleted', async () => {
    const { result } = renderHook(() => useHandleSwap(priceImpactMock), { wrapper: withModalProvider })

    await result.current()

    expect(onChangeRecipient).toBeCalledTimes(1)
    expect(onChangeRecipient).toHaveBeenCalledWith(null)
  })
})
