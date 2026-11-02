import { useState } from 'react'
import { Button } from '@veneer/core'
import { ThemeProvider } from '@veneer/theme'
import { RejectCatalogModal } from './RejectCatalogModal'
import { mockBundle } from './rejectCatalog.mock'

export function RejectCatalogDemo() {
  const [show, setShow] = useState(false)
  const [savedReason, setSavedReason] = useState<string | null>(null)

  return (
    <ThemeProvider mode="light">
      <Button appearance="secondary" onClick={() => setShow(true)}>Reject</Button>
      {savedReason !== null && <p>Rejected {mockBundle.name}: {savedReason}</p>}
      <RejectCatalogModal
        show={show}
        bundleName={mockBundle.name}
        onClose={() => setShow(false)}
        onReject={(reason) => { setSavedReason(reason); setShow(false) }}
      />
    </ThemeProvider>
  )
}
