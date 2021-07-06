import { createAction } from '@reduxjs/toolkit'
import { PopupContent as PopupContentUniswap } from '@src/state/application/actions'

export * from '@src/state/application/actions'

export type PopupContent = PopupContentUniswap | MetaTxPopupContent

export interface MetaTxPopupContent {
  metatxn: {
    id: string
    success: boolean
    summary?: string | JSX.Element
  }
}

export const addPopup =
  createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>('application/addPopup')
