'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import VaultCreator from './VaultCreator';

export default function Home() {
    const [safeAddress, setSafeAddress] = useState<string | null>(null);

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Spawn your agent</h1>

                <div className="space-y-8">
                    <VaultCreator onSuccess={setSafeAddress} />

                    {safeAddress && (
                        <div className="bg-primary text-secondary p-4 rounded">
                            <h2 className="font-semibold mb-2">Vault Created!</h2>
                            <p className="text-sm break-all">Transaction: {safeAddress}</p>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}