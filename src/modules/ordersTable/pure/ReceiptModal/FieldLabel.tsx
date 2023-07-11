import { InfoIcon } from 'legacy/components/InfoIcon'

import * as styledEl from './styled'

interface Props {
  label: string
  tooltip?: string | JSX.Element
  prefix?: string | JSX.Element
}

export function FieldLabel({ label, tooltip, prefix }: Props) {
  return (
    <styledEl.Label>
      {prefix}
      <styledEl.LabelText>{label}</styledEl.LabelText>
      {tooltip && <InfoIcon content={tooltip} />}
    </styledEl.Label>
  )
}
