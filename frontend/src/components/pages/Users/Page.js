import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Paper from "material-ui/Paper";
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader
} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import AccountBox from "@material-ui/icons/AccountBox";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Tooltip from "material-ui/Tooltip";

export default ({ users, onNext, onPrev }) => (
  <Root>
    <div>
      <Paper>
        <List component="nav" subheader={<ListSubheader>Users</ListSubheader>}>
          {users.items.map((user, index) => (
            <Link to={`/user/${user.key}`} key={index}>
              <ListItem button>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary={`${user.name}`} />
                <ListItemIcon>
                  <KeyboardArrowRight />
                </ListItemIcon>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
      <br />
      <Board>
        {users.pageInfo.hasPreviousPage ? (
          <Tooltip id="prev-icon" title="prev">
            <Link to={`/users/${users.pageInfo.startCursor}`}>
              <Button
                variant="fab"
                aria-label="prev"
                mini
                onClick={() => onNext(users.pageInfo.startCursor)}
              >
                <KeyboardArrowLeft />
              </Button>
            </Link>
          </Tooltip>
        ) : (
          <Button variant="fab" aria-label="prev" mini disabled>
            <KeyboardArrowLeft />
          </Button>
        )}

        {"  "}

        {users.pageInfo.hasNextPage ? (
          <Tooltip id="next-icon" title="next">
            <Link to={`/users/${users.pageInfo.endCursor}`}>
              <Button
                variant="fab"
                aria-label="next"
                mini
                onClick={() => onNext(users.pageInfo.endCursor)}
                disabled={!users.pageInfo.hasNextPage}
              >
                <KeyboardArrowRight />
              </Button>
            </Link>
          </Tooltip>
        ) : (
          <Button variant="fab" aria-label="next" mini disabled>
            <KeyboardArrowRight />
          </Button>
        )}
      </Board>
    </div>
  </Root>
);

const Root = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;

  > div {
    width: 30rem;
  }
`;

const Board = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
