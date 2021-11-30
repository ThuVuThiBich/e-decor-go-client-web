import { alpha, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    marginTop: ({ isVisible }) => (isVisible ? 40 : 0),
    backgroundColor: "#0c0e30",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
