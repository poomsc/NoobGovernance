import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { injected } from "utils/connectors";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "hooks/useConnectWallet";
import { Web3Provider } from "@ethersproject/providers";
import { ConnectorType } from "types/web3ConnectorType";
import shortenAddress from "utils/shortenAddress";

export default function Navbar() {
  const { connector, account, activate, deactivate }  = useWeb3React<Web3Provider>();

  const [
    activatingConnector,
    setActivatingConnector,
  ] = useState<ConnectorType>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <AppBar position="fixed" className="bg-white">
      <Toolbar className="flex justify-between">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {account ? (
          <div
            className="w-32 bg-white h-8 rounded-lg items-center flex justify-center cursor-pointer font-bold"
            style={{ color: "#52c4cc" }}
            onClick={() => {
              setActivatingConnector(injected);
              deactivate();
            }}
          >
            {shortenAddress(account)}
          </div>
        ) : (
          <div
            className="w-32 bg-white h-8 rounded-lg items-center flex justify-center cursor-pointer font-bold"
            style={{ color: "#52c4cc" }}
            onClick={() => {
              setActivatingConnector(injected);
              activate(injected);
            }}
          >
            Connect wallet
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
