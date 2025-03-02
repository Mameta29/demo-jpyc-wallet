'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// トランザクション型の定義
interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

export function TransactionHistory() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // チェーン情報を取得する関数
  const getChainInfo = (chainId: number) => {
    switch (chainId) {
      case 1:
        return {
          name: 'Ethereum',
          explorerUrl: 'https://etherscan.io'
        };
      case 137:
        return {
          name: 'Polygon',
          explorerUrl: 'https://polygonscan.com'
        };
      default:
        return {
          name: 'Unknown',
          explorerUrl: '#'
        };
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isConnected || !address) return;
      
      setIsLoading(true);
      try {
        // Note: Here we would typically fetch transactions from a blockchain explorer API
        // This is a placeholder for demonstration
        const mockTransactions: Transaction[] = [
          {
            hash: '0x123...',
            from: address,
            to: '0x456...',
            value: '1000',
            timestamp: Date.now() - 3600000,
          },
          // Add more mock transactions as needed
        ];
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [address, isConnected, chainId]);

  if (!isConnected) {
    return (
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Connect your wallet to view transaction history
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No transactions found
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {tx.from === address ? 'Sent' : 'Received'} JPYC
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {tx.from === address ? '-' : '+'} ¥{Number(tx.value).toLocaleString()}
                  </p>
                  <a
                    href={`${getChainInfo(chainId).explorerUrl}/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    View Transaction
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}