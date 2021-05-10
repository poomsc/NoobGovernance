import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "components/Navbar";
import CandidateCard from "components/CandidateCard";
import ContractBox from "components/ContractBox";
import { factoryNoobGovernance } from "constant/address";
import { Web3Provider } from "@ethersproject/providers";
import { useContract } from "hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

export const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const classes = useStyles();
  const { library } = useWeb3React<Web3Provider>();

  const [noobAddress, setNoobAddress] = useState<string>();
  const [timeElection, setTimeElection] = useState<number>();
  const [candidateList, setCandidateList] = useState<string[]>();

  const FactoryContract = useContract({
    address: factoryNoobGovernance,
    abiName: "NoobGovernanceFactory",
  });

  const NoobContract = useContract({
    address: noobAddress,
    abiName: "NoobGovernance",
  });

  useEffect(() => {
    if (!library) return;

    const getNoobAddress = async () => {
      const indexNoobAddress = (
        await FactoryContract.lastElection.call()
      ).toNumber();
      console.log("type ", typeof indexNoobAddress);
      const noobAddress = await FactoryContract.noobAddress(
        (indexNoobAddress - 1).toString()
      );
      setTimeElection(indexNoobAddress);
      setNoobAddress(noobAddress);
    };
    getNoobAddress();
  }, [library]);

  useEffect(() => {
    if (!noobAddress) return;

    const fetchData = async () => {
      const candidateList = await NoobContract.candidateList.call();
      console.log({ candidateList });
      setCandidateList(candidateList);
    };
    fetchData();
  }, [noobAddress]);

  const handleOnVote = async (_no: number) => {
    const res = NoobContract.vote(_no);
    console.log({res});
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <main className="pt-8">
        <div className={classes.heroContent}>
          <ContractBox timeElection={timeElection} noobAddress={noobAddress} />
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {candidateList &&
              candidateList.map((candidateName, index) => (
                <CandidateCard
                  candidateName={candidateName}
                  key={index}
                  handleOnVote={() => handleOnVote(index - 1)}
                />
              ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </footer>
    </React.Fragment>
  );
}
