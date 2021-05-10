import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Typography, TextField, Container } from "@material-ui/core";
import { useContract } from "hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import shortenAddress from "utils/shortenAddress";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { factoryNoobGovernance } from "constant/address";

type PropsType = {
  noobAddress?:string;
  timeElection?: number;
}

export default function ContractBox({noobAddress, timeElection}:PropsType) {
  const FactoryContract = useContract(
    {
      address: factoryNoobGovernance,
      abiName: "NoobGovernanceFactory",
    });

  const [candidateNames, SetCandidateNames] = useState<string[]>();
  const [duration, setDuration] = useState<string>();

  const createNoobGovernance = () => {
    const res = FactoryContract.createNoobGovernance(candidateNames, duration);
    console.log({ res });
  };
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
        className="uppercase"
      >
        Noob Governance
      </Typography>
      <div className="flex item-center justify-between">
        <p>Factory address </p>
        <CopyToClipboard text={factoryNoobGovernance}>
          <p>
            {shortenAddress(factoryNoobGovernance)}
            <FileCopyIcon fontSize="small" className="ml-4"  />
          </p>
        </CopyToClipboard>
      </div>
      <div className="flex item-center justify-between">
        <p>NoobGovernance address</p>
        <CopyToClipboard text={noobAddress || ""}>
          <p>
            {noobAddress && shortenAddress(noobAddress)}
            <FileCopyIcon fontSize="small" className="ml-4" />
          </p>
        </CopyToClipboard>
      </div>
      <p>#{timeElection} Election</p>
      <div className="flex items-center flex-col justify-between h-28">
        <div className="flex justify-between w-full px-8">
          <TextField
            id="Candidate-Register"
            label="Candidate Register"
            placeholder="Alice, Bob, Chuck"
            color="primary"
            onChange={(e) => SetCandidateNames(e.target.value.split(", "))}
          />
          <TextField
            id="Duration"
            label="Duration"
            placeholder="second unit"
            color="primary"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={createNoobGovernance}
        >
          Create NoobGovernance
        </Button>
      </div>
    </Container>
  );
}
