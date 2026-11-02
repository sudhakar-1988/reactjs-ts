import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Button, Modal, TextArea } from '@veneer/core'
import { useTheme } from '@veneer/theme'

type rejectCatalogModalProps = {
  show: boolean
  bundleName: string
  onReject: (reason: string) => void
  onClose: () => void
}

export function RejectCatalogModal(props: rejectCatalogModalProps) {
  const theme = useTheme()
  const [reason, setReason] = useState('')
  const canReject = reason.trim().length > 0 // AC-3

  const handleClose = () => {
    setReason('') // AC-5: nothing typed is kept
    props.onClose()
  }

  const handleReject = () => {
    if (!canReject) return
    props.onReject(reason.trim()) // AC-4
    setReason('')
  }

  return (
    <Modal
      show={props.show}
      title="Reject Catalog"
      closeButton
      closeOnBlur={false}
      i18n={{ close: 'Close' }} // AC-8
      onClose={handleClose}
      alignFooter="end"
      footer={
        <Button appearance="primary" disabled={!canReject} onClick={handleReject}>
          Reject
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.layout.size5 }}>
        <span
          style={{
            fontSize: theme.typography.size4,
            lineHeight: theme.typography.lineHeight4,
            fontWeight: theme.typography.weight3,
          }}
        >
          Are you sure you would like to reject{' '}
          <strong style={{ fontWeight: theme.typography.weight6 }}>{props.bundleName}</strong>?
          Please provide a suitable reason to reject this soft bundle
        </span>
        <TextArea
          id="reject-reason"
          label="Reason for rejection"
          required
          placeholder="Add your comments here"
          value={reason}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setReason(event.target.value)}
        />
      </div>
    </Modal>
  )
}
