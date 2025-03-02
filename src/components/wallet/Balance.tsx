'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId, useConfig } from 'wagmi';
import { createJPYCOperations } from '@/lib/jpyc';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function Balance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const config = useConfig();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 137:
        return 'Polygon';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (!isConnected || !address) return;
      
      setIsLoading(true);
      try {
        const operations = await createJPYCOperations(config);
        const newBalance = await operations.getBalance(address);
        setBalance(newBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [address, isConnected, chainId]);

  if (!isConnected) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Connect your wallet to view balance
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Your JPYC Balance
          </h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-2xl font-bold">Loading...</p>
                </div>
              ) : (
                <p className="text-2xl font-bold">
                  ¥{Number(balance).toLocaleString()}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                on {getChainName(chainId)} Network
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}