import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment ,Image, Button} from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthread">
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png'></Image>
           Reactivities
        </Header>
        <Header as='h2' inverted  content='welcome to Reactivities'></Header>
        <Button as={Link} to='/activities' size="huge"  inverted>
            Take me to the activities!
        </Button>
      </Container>
    </Segment>
  )
}