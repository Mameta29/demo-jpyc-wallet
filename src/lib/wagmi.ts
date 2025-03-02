// src/lib/wagmi.ts
import { http, createConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})