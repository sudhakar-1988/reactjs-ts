// KAN-5: "Reject Catalog" modal (Figma 2520:97117).
import { useState } from 'react';
import { Button, Modal, TextArea } from '@veneer/core';
import { useTheme } from '@veneer/theme';

// Modal width from the Figma frame; no Veneer size token fits (CP-2 #5).
const MODAL_MAX_WIDTH = 1146;
// Reason field height, nearest 4px step to the 121px design value (CP-2 #6).
const REASON_HEIGHT = '120px';

const MESSAGE_ID = 'reject-bundle-message';
const REASON_ID = 'reject-bundle-reason';
const SUBMIT_ERROR_TEXT = 'The soft bundle could not be rejected. Please try again.';

export type RejectBundleModalProps = {
  /** When true, the modal is visible. */
  show: boolean;
  bundleId: string;
  bundleName: string;
  /** Saves the rejection. Reject the promise to show the error state. */
  onReject: (bundleId: string, reason: string) => Promise<void>;
  /** Called after the modal closes (X click or successful reject). */
  onClose: () => void;
};

export function RejectBundleModal({ show, bundleId, bundleName, onReject, onClose }: RejectBundleModalProps) {
  const { layout } = useTheme();
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // AC-3: whitespace-only counts as empty (CP-1 Q3).
  const trimmedReason = reason.trim();

  const reset = () => {
    setReason('');
    setSubmitting(false);
    setSubmitError(false);
  };

  // AC-5: close without rejecting and discard what was typed.
  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  // AC-4: save the rejection with the reason, then close.
  const handleReject = async () => {
    if (!trimmedReason || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      await onReject(bundleId, trimmedReason);
      reset();
      onClose();
    } catch {
      // CP-1 Q6: keep the modal open and show the error under the field.
      setSubmitting(false);
      setSubmitError(true);
    }
  };

  // Veneer input onChange convention (value first). Verify against the installed package (CP-2 #7).
  const handleReasonChange = (value: string) => {
    setReason(value);
    if (submitError) setSubmitError(false);
  };

  return (
    <Modal
      show={show}
      title="Reject Catalog"
      closeButton
      closeOnBlur={false}
      onClose={handleClose}
      i18n={{ close: 'Close' }}
      maxWidth={MODAL_MAX_WIDTH}
      expanded
      alignFooter="end"
      aria-describedby={MESSAGE_ID}
      footer={
        <Button appearance="primary" disabled={!trimmedReason} loading={submitting} onClick={handleReject}>
          Reject
        </Button>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: layout.size6 }}>
        <p id={MESSAGE_ID} className="title-small" style={{ margin: layout.size0 }}>
          Are you sure you would like to reject <strong>{bundleName}</strong>? Please provide a suitable reason to
          reject this soft bundle
        </p>
        <TextArea
          id={REASON_ID}
          label="Reason for rejection"
          required
          placeholder="Add your comments here"
          value={reason}
          onChange={handleReasonChange}
          height={REASON_HEIGHT}
          resize={false}
          disabled={submitting}
          error={submitError}
          helperText={submitError ? SUBMIT_ERROR_TEXT : undefined}
          helperTextState={submitError ? 'error' : 'default'}
          helperTextVisibility={submitError ? 'visible' : 'hidden'}
        />
      </div>
    </Modal>
  );
}
