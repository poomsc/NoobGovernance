import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import { injected } from "utils/connectors";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "hooks/useConnectWallet";
import { Web3Provider } from "@ethersproject/providers";
import { ConnectorType } from "types/web3ConnectorType";

export default function Navbar() {
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    // library,
    // chainId,
    // account,
    activate,
    deactivate,
    active,
    error,
  } = context;

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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          // className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" >
          News
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            setActivatingConnector(injected);
            activate(injected);
          }}
        >
          Connect wallet
        </Button>
      </Toolbar>
    </AppBar>
  );
}
