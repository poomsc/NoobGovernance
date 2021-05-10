import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import { formatUnits } from '@ethersproject/units';
import isAddress from 'utils/isAddress';
import ABI from 'constant/abi'
import get from 'lodash.get'

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  // eslint-disable-next-line
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function useContract({address, abiName}:{address?:string, abiName:string}): Contract {
  const { account, library } = useWeb3React<Web3Provider>();

  if(!address)
  return {} as any;

  return getContract(
    address,
    get(ABI, abiName),
    library as Web3Provider,
    account as string,
  );
}