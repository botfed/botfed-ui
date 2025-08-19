// src/components/ConnectButton.tsx
import { useConnect, useAccount } from 'wagmi';

export default function ConnectButton() {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();

  if (isConnected) return null;

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}