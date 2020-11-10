import React, { useContext } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Language from "@material-ui/icons/Language";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Auth
import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';


// style
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import logo from '../../images/bucketify_logo.png';
import {
  AuthContext,
} from '../../App'

const drawerWidth = 240;

// Make custom styles.
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoWrapper: {
      margin: 'auto',
      justifyContent: 'center',
      paddingRight: '24px',
      // Make the logo image stick out.
      maxHeight: '4rem',


      [theme.breakpoints.up("md")]: {
        margin: '0',
      },
    },
    logo: {
      height: '3.1rem',
      lineHeight: '2.1rem',
      padding: '0 0 0 0',

      '& h1': {
        margin: 'auto',
        paddingTop: '0.25rem',
        [theme.breakpoints.down("sm")]: {
          paddingTop: '0.5rem',
        },

      },

      // Make the logo image stick out.
      [theme.breakpoints.up("md")]: {
        height: '5rem',
      },
    },

    toolbar: {
      paddingRight: 24,
      [theme.breakpoints.up("md")]: {
        paddingLeft: '0.5rem',
      }
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),

    },
    // When drawer is open.
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    menuButton: {
      // marginRight: 36,

    },
    menuButtonHidden: {
      display: "none",
    },

    // Nav button is Show in PC only.
    buttonNav: {
      marginLeft: 'auto',
      [theme.breakpoints.down("sm")]: {
        display: 'none',
      },
      '& button': {
        margin: '0.25rem',
      }
    },

    // IconButton
    iconButtonLink: {
      color: 'white',
    }

  })
);


export interface MyAppBarProps {
  isDarkMode: boolean;
  isDrawerOpen: boolean;
  handleDarkModeToggle: (isDarkMode: boolean) => void;
  handleDrawerOpen: () => void;

}

export const MyAppBar: React.FC<MyAppBarProps> = ({
  isDarkMode,
  isDrawerOpen,
  handleDarkModeToggle,
  handleDrawerOpen,
}) => {
  const AuthStateHooks = useContext(AuthContext);

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpen()}
          className={
            clsx(
              classes.menuButton,

              (isDrawerOpen || matches) && classes.menuButtonHidden
            )}
        >
          <MenuIcon />
        </IconButton>
        <Box className={clsx(classes.logoWrapper)}>
          <a href="/" className={clsx(classes.logo)} >
            <h1>
              <img src={logo} alt="bucketify-logo" className={clsx(classes.logo)} />
            </h1>
          </a>
        </Box>


        <Box className={clsx(classes.buttonNav)}>

        <Tooltip title="Language">
          <IconButton color="inherit"  >
            <Language />
          </IconButton>
        </Tooltip>


          <Tooltip title="Contrast">
            {
              isDarkMode ? (
                <IconButton color="inherit" onClick={() => handleDarkModeToggle(isDarkMode)} aria-label="Switch to Light mode">
                  <Brightness7Icon />
                </IconButton>
              ) : (

                  <IconButton color="inherit" onClick={() => handleDarkModeToggle(isDarkMode)} aria-label="Switch to Dark mode">
                    <Brightness4Icon />
                  </IconButton>
                )
            }
          </Tooltip>

          {
            AuthStateHooks.authState === AuthState.SignedIn ? (
              <React.Fragment>
                <Link href='/accounts'>
        <Tooltip title="Account">

                  <IconButton className={clsx(classes.iconButtonLink)}>
                    <AccountCircle />
                  </IconButton>
                  </Tooltip>

                </Link>
                <Tooltip title="SignOut">
                <IconButton className={clsx(classes.iconButtonLink)} onClick={() => Auth.signOut()}>
                  <ExitToAppIcon />
                </IconButton>
                </Tooltip>

              </React.Fragment>
            ) : (
                <React.Fragment>
                  <Button variant="outlined" color="secondary">
                    Sign In
                  </Button>
                  <Button variant="contained" color="secondary">
                    Sign Up
                </Button>
                </React.Fragment>
              )
          }

        </Box>

      </Toolbar>
    </AppBar>


  );
};