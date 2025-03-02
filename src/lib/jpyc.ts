import { ChainName, Endpoint, NetworkName } from '@jpyc/sdk-core';
import { IJPYC, ISdkClient, JPYC, SdkClient } from '@jpyc/sdk-v1';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { Config } from '@wagmi/core';
import { Uint256 } from 'soltypes';

const chainMapping: { [key: number]: { chainName: ChainName; networkName: NetworkName } } = {
  1: { chainName: 'ethereum', networkName: 'mainnet' },
  137: { chainName: 'polygon', networkName: 'mainnet' },
  100: { chainName: 'gnosis', networkName: 'mainnet' },
  43114: { chainName: 'avalanche', networkName: 'mainnet' },
  592: { chainName: 'astar', networkName: 'mainnet' },
};

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

export async function initializeJpycSDK(config: Config): Promise<IJPYC | null> {
  try {
    const chainId = config.state.chainId;
    
    if (!chainId || !chainMapping[chainId]) {
      console.error('Unsupported chain');
      return null;
    }

    const sdkClient: ISdkClient = new SdkClient({
      chainName: chainMapping[chainId].chainName,
      networkName: chainMapping[chainId].networkName,
      rpcEndpoint: process.env.NEXT_PUBLIC_RPC_ENDPOINT as Endpoint,
    });

    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || '';
    const formattedPrivateKey = (privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`) as `0x${string}`;

    const account = sdkClient.createPrivateKeyAccount({
      privateKey: formattedPrivateKey,
    });

    const client = sdkClient.createLocalClient({
      account: account,
    });

    return new JPYC({
      client: client,
    });

  } catch (error) {
    console.error('Error initializing JPYC SDK:', error);
    return null;
  }
}

export type JPYCOperations = {
  getBalance: (address: `0x${string}`) => Promise<string>;
  transfer: (to: `0x${string}`, amount: string) => Promise<any>;
};

export async function createJPYCOperations(config: Config): Promise<JPYCOperations> {
  const jpyc = await initializeJpycSDK(config);
  
  return {
    getBalance: async (address: `0x${string}`) => {
      try {
        if (!jpyc) throw new Error('JPYC not initialized');
        const balance = await jpyc.balanceOf({ account: address });
        return balance.toString();
      } catch (error) {
        console.error('Error fetching balance:', error);
        return '0';
      }
    },
    
    transfer: async (to: `0x${string}`, amount: string) => {
      try {
        if (!jpyc) throw new Error('JPYC not initialized');
        const value = Uint256.from(amount);
        return await jpyc.transfer({
          to,
          value,
        });
      } catch (error) {
        console.error('Error transferring JPYC:', error);
        throw error;
      }
    },
  };
}