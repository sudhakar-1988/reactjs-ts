// KAN-5: Soft Bundle Details page header (name | ID, Reject, Approve).
import { Button } from '@veneer/core';
import { useTheme } from '@veneer/theme';

export type SoftBundleHeaderProps = {
  bundleId: string;
  bundleName: string;
  onReject: () => void;
  onApprove: () => void;
  /** Disables both actions, e.g. while a decision is in progress. */
  actionsDisabled?: boolean;
};

export function SoftBundleHeader({
  bundleId,
  bundleName,
  onReject,
  onApprove,
  actionsDisabled = false,
}: SoftBundleHeaderProps) {
  const { layout, color } = useTheme();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: layout.size4,
        padding: layout.size8,
        background: color.background.container,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: layout.size4 }}>
        <h1 className="title-regular" style={{ margin: layout.size0 }}>
          {bundleName}
        </h1>
        <span
          aria-hidden="true"
          style={{ alignSelf: 'stretch', borderLeft: `1px solid ${color.stroke.default}` }}
        />
        <span className="label" style={{ color: color.foreground.light }}>
          {bundleId}
        </span>
      </div>
      <div style={{ display: 'flex', gap: layout.size4 }}>
        <Button appearance="secondary" onClick={onReject} disabled={actionsDisabled}>
          Reject
        </Button>
        <Button appearance="primary" onClick={onApprove} disabled={actionsDisabled}>
          Approve
        </Button>
      </div>
    </header>
  );
}
