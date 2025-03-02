import { Header } from '@/components/layout/Header';
import { WalletComponent } from '@/components/wallet/WalletComponent';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <WalletComponent />
    </main>
  );
}