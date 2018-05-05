import React from "react";
import { Link } from "react-router-dom";
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

export default ({ user, match }) => (
  <div>
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="Recipe">{user.key}</Avatar>}
        title={user.name}
        subheader={`key: ${user.key}`}
      />
      <CardContent>
        <Typography>User Detail...</Typography>
      </CardContent>
      <CardActions>
        {history.location.pathname === match.url ? (
          <Link to={`/users`}>
            <Button size="small">back</Button>
          </Link>
        ) : (
          <Button size="small" onClick={history.goBack}>
            back
          </Button>
        )}
      </CardActions>
    </Card>
  </div>
);
