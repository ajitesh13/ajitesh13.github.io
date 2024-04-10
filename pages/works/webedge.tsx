import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Webedge">
    <Container>
      <Title>
        Webedge
        {/* <Badge>2020-</Badge> */}
      </Title>
      <WorkImage src="/images/works/webedge.png" alt="Github Screenshot" />
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Github</Meta>
          <Link href="https://github.com/HarshCasper/WebEdge">
            Webedge <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>CLI</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Python</span>
        </ListItem>
      </List>
      <strong>Bringing Edge to your Web Performance!</strong>
      <br />
      <br />
      <P>
        Rise of Web has heralded the increasing ways in which we optimize
        Digital Performance. With SEO and Web Performance playing an important
        part, Developers feel lost around Performance needs. WebEdge aims to fix
        this 🌐 WebEdge have been introduced to suggest Web Optimizations for
        the App that can speed up operations and boost productivity ⚡
      </P>
      <br />
      <strong>💡 Why did we build it?</strong>
      <br />
      <br />
      <P>
        As Frontend Developers, Performance plays an important part for Ranking
        and User Experience. The priority is such that it cannot be avoided any
        longer. WebEdge provides a Python Package for you to scrap you Website
        and auto-suggest improvements you can make to improve your Optimization
        Ranking ♾️ With this Package, we aim to have a unified tool to improve
        your SEO Ranking with real-time optimizations, that you can fix as a
        Developer. Sounds interesting? Well it is 🔥
      </P>
      <WorkImage src="/images/works/webedge2.png" alt="Webedge" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
