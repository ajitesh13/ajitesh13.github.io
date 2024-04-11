import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  OrderedList
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Clarity">
    <Container>
      <Title>
        Clarity
        {/* <Badge>2020-</Badge> */}
      </Title>
      <WorkImage src="/images/works/clarity.png" alt="Github Screenshot" />
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/QEDK/clarity">
            Clarity <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Chrome, Firefox, Safari</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, FastAPI, PostgreSQL</span>
        </ListItem>
      </List>
      <strong>
        As said by Blaise Pascal, "Clarity of minds means clarity of passion"
      </strong>
      <br />
      <br />
      <P>
        One's passion make their life worth living. Inspired by this thought and
        taking into account the state of mental health in today's date, we
        decided to work on something that we would find amazing to use. What if
        you wanted to remember how you felt a week or two ago? What if you want
        to know what crossed your mind then?
      </P>
      <br />
      <strong>🙋 How does it work?</strong>
      <br />
      <br />
      It's simple! Follow these steps:
      <br />
      <br />
      <OrderedList>
        <ListItem>
          Visit the app and you can pen down something, anything.
        </ListItem>
        <ListItem>
          Follow your emotions, just don't hesitate to dive deep down into it.
        </ListItem>
        <ListItem>Write down your emotions truly and that's it!</ListItem>
        <ListItem>
          Click on submit and it will be stored as a little secret between us.
        </ListItem>
        <ListItem>
          Want to know about your state of your mind few days back? Don't worry
          we will show you.
        </ListItem>
        <ListItem>
          Want to share it with someone else or your therapist? We have that
          too!
        </ListItem>
      </OrderedList>
      <br />
      <strong>💻 Tech stack</strong>
      <br />
      <br />
      <P>
        clarity has a ReactJS frontend ⚛️ hosted with Heroku, and a FastAPI
        backend backed by PostgreSQL hosted on Google Cloud Platform. The UI is
        based on React, while the Cloud Run backend uses SQLAlchemy and asyncpg
        for communicating with Cloud SQL. 💽
      </P>
    </Container>
  </Layout>
)

export default Work
// export { getServerSideProps } from '../../components/chakra'
