// KAN-5: mock data and a mock reject call for the Soft Bundle Details page.
// No API is in scope (CP-1 Q1); replace mockRejectSoftBundle with the real service later.

export type SoftBundle = {
  id: string;
  name: string;
  description: string;
};

export const mockSoftBundle: SoftBundle = {
  id: 'SF68769',
  name: 'Welfare Pack - V2',
  description: '--',
};

const MOCK_LATENCY_MS = 500;

export function mockRejectSoftBundle(bundleId: string, reason: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info(`[mock] Soft bundle ${bundleId} rejected. Reason: ${reason}`);
      resolve();
    }, MOCK_LATENCY_MS);
  });
}
