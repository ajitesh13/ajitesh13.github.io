import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Webextension Activity Monitor">
    <Container>
      <Title>
        Webextension Activity Monitor
        {/* <Badge>2020-</Badge> */}
      </Title>
      <WorkImage
        src="/images/works/activitymonitor2.png"
        alt="Github Screenshot"
      />
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/ajitesh13/webextension-activity-reporter">
            ajitesh13/webextension-activity-reporter{' '}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Firefox &gt;= 72</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>JavaScript</span>
        </ListItem>
      </List>
      <P>
        Extensions do most of their work invisibly from users and hence
        Extension activity is a complete mystery for most users, even advanced
        ones. Providing more transparency could help increase reliability of
        abuse reporting and accountability for developers, as well as providing
        an additional useful tool to aid investigating bugs in the Extensions or
        in the Firefox WebExtensions internals.
      </P>
      <br />
      <P>
        The activityLog Extension will help the user to track the activities of
        the activated Extensions in their browser. For example, the network
        requests they are making, altered browser settings, the API function
        calls and events they are executing or listening during the background
        functioning of Firefox. This will also let the user know which component
        of an activated Extensions is activated currently and what task it is
        concerned with. Unlike the about:addons which is the primary way how all
        Firefox users manage their addons which includes listing,
        enabling/disabling, setting preferences, etc. This Extension will list
        out the activities other extensions are doing and will enable a feature
        for firefox developers, WebExtension developers, reviewers and
        sophisticated users to trace the individual Extensions. This feature is
        not meant to provide information in a format that's useful for the
        average user, just for the people who already have a thorough
        understanding of how Extensions work.
      </P>
      <WorkImage
        src="/images/works/activitymonitor.png"
        alt="Activity Monitor Screenshot"
      />
      Here is how the output of the activity monitor looks like:
      <br />
      <br />
      <WorkImage
        src="/images/works/activitymonitor3.png"
        alt="Activity Monitor Screenshot"
      />
    </Container>
  </Layout>
)

export default Work
// export { getServerSideProps } from '../../components/chakra'
