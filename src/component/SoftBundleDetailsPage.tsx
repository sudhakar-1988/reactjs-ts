// KAN-5: demo host page for the Reject Catalog modal (mock data, no API).
// Not mounted yet: App.tsx is unchanged (new files only, CP-2 #2).
import { useState } from 'react';
import { ThemeProvider } from '@veneer/theme';
import { RejectBundleModal } from './RejectBundleModal';
import { SoftBundleHeader } from './SoftBundleHeader';
import { mockRejectSoftBundle, mockSoftBundle } from './softBundle.mock';
import type { SoftBundle } from './softBundle.mock';

export type SoftBundleDetailsPageProps = {
  bundle?: SoftBundle;
  onReject?: (bundleId: string, reason: string) => Promise<void>;
  onApprove?: (bundleId: string) => void;
};

export function SoftBundleDetailsPage({
  bundle = mockSoftBundle,
  onReject = mockRejectSoftBundle,
  onApprove = () => undefined,
}: SoftBundleDetailsPageProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);

  return (
    <ThemeProvider mode="light">
      {/* AC-6: the header stays visible behind the modal; the Modal blocks interaction until it closes. */}
      <SoftBundleHeader
        bundleId={bundle.id}
        bundleName={bundle.name}
        onReject={() => setShowRejectModal(true)}
        onApprove={() => onApprove(bundle.id)}
      />
      <RejectBundleModal
        show={showRejectModal}
        bundleId={bundle.id}
        bundleName={bundle.name}
        onReject={onReject}
        onClose={() => setShowRejectModal(false)}
      />
    </ThemeProvider>
  );
}
