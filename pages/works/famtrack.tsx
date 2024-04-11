import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="FamTrack">
    <Container>
      <Title>
        FamTrack
        {/* <Badge>2020-</Badge> */}
      </Title>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/ajitesh13/FamTrack">
            ajitesh13/FamTrack <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Android, iOS</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Flutter, Dart</span>
        </ListItem>
      </List>
      <strong>An applicaition for not letting your loved ones alone.</strong> 🚧
      <br />
      <br />
      <P>
        Older people who suffer from ailments like Alzheimer's often forget
        their family members and their homes and it becomes highly difficult to
        take their care. Children need the space to grow but at the same time
        parent's need to assure their kids safety.
      </P>
      <br />
      <strong>🔧 Solution</strong>
      <br />
      <br />
      <P>
        FamTrack is a smart way to keep an eye on your loved one's well being.
        It lets the family members add each other and then they can set safe
        locations for each member individually and when someone is out of those
        locations for more than thirty minutes, then all the family members get
        a notification with their current location. This is an implementation of
        GeoFencing with an extra step that the app notifies you of the location
        changes and you can leave the worries.
      </P>
      <br />
      <strong>🔍 Use Cases</strong>
      <br />
      <br />
      <P>
        Parents won't have to constantly check the phone and call to ensure
        everyones safety. One can any time check their family member's location
        and know where they are. After setting the safe locations, reminders
        when a person is away from them can help avoid major accidents.
      </P>
      <br />
      <strong>🤔 Unique Selling Point (USP) </strong>
      <br />
      <br />
      <P>
        GeoFencing has been done before but the extra layer of security by
        adding automated periodic checking stands us apart.
      </P>
      <br />
    </Container>
  </Layout>
)

export default Work
// export { getServerSideProps } from '../../components/chakra'
