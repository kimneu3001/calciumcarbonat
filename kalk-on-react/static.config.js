import axios from 'axios'
import React, {
  Component
} from 'react'
import {
  ServerStyleSheet
} from 'styled-components'

export default {
  getSiteProps: () => ({
    title: 'ARCHIVE-KALK',
  }),
  getRoutes: async() => {
    const {
      data: projects
    } = await axios.get('src/posts.json')
    return [{
        path: '/',
        component: 'src/containers/Home',
        getProps: () => ({
          projects,
        }),
        children: projects.map(project => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getProps: () => ({
            projects,
          }),
        })),
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles( < Comp / > ))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const {
        Html,
        Head,
        Body,
        children,
        renderMeta
      } = this.props

      return (
        <Html>
        <Head>
        <meta charSet = "UTF-8" / >
        <meta name = "viewport" content = "width=device-width, initial-scale=1" / >
        {renderMeta.styleTags
        }
      </Head>
      <Body>{children}</Body>
      </Html>
      )
    }
  },
}
