import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";

class Choose extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='mt-3'>
        <CustomTabs
          headerColor="primary"
          tabs={[
            {
              tabName: "Opóźnienie lotu",
              tabIcon: Face,
              tabContent: (
                <p className={classes.textCenter}>
                  Chodzi o czas spóźnienia do miejsca docelowego, powyżej 3h.
                  </p>
              )
            },
            {
              tabName: "Nie przyjęli mnie na pokład",
              tabIcon: Chat,
              tabContent: (
                <p className={classes.textCenter}>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that
                  things could be at. I will be the leader of a company
                  that ends up being worth billions of dollars, because
                  I got the answers. I understand culture. I am the
                  nucleus. I think that’s a responsibility that I have,
                  to push possibilities, to show people, this is the
                  level that things could be at.
                  </p>
              )
            },
            {
              tabName: "Odwołany lot",
              tabIcon: Build,
              tabContent: (
                <p className={classes.textCenter}>
                  Na mniej niż 14 dni przed wylotem
                        </p>
              )
            }
          ]}
        />
      </div>
    );
  }
}

export default withStyles(tabsStyle)(Choose);
