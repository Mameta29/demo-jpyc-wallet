'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Send, History } from 'lucide-react';
import { Balance } from './Balance';
import { SendForm } from './SendForm';
import { TransactionHistory } from './TransactionHistory';

export function WalletComponent() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">JPYC Wallet</CardTitle>
          <CardDescription>
            Send and receive JPYC tokens across multiple chains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="balance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="balance" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Balance
              </TabsTrigger>
              <TabsTrigger value="send" className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="balance">
              <Balance />
            </TabsContent>
            
            <TabsContent value="send">
              <SendForm />
            </TabsContent>
            
            <TabsContent value="history">
              <TransactionHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}