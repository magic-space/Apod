import React from 'react'
import axios from 'axios'

import Head from 'next/head'
import Router from 'next/router'
import Nav from '../../components/utils/nav'
import Footer from '../../components/utils/footer'
import DayContent from '../../components/content/day'
import DateNotExist from '../../components/content/dateNotExist'

import DateHelper from '../../helpers/date'

class Day extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static async getInitialProps(ctx) {
    if (DateHelper.validDateAndPast(ctx.query.day)) {
      const key = '8g23BupBSJXtE86RIMPOYki0ele3dSRvoshr5yLM'

      var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${ctx.query.day}`

      let req = await axios.get(`${url}`)
      if (req.status === 200) {
        console.log(req.data)
        var dayData = req.data
        dayData.can = `https://${ctx.req.headers.host}`
        return {
          dayData
        }
      }
    }
    return {
      dayData: null
    }

  }

  render() {
    let { dayData } = this.props
    const { date, title, copyright, explanation, media_type, url, can } = dayData
    const titlePage = `Apod Day ${date}`
    const titleCards = `${date} - ${title}`
    const description = `
      ${(title) ? `${title}, ` : ''}
      ${(copyright) ? `${copyright}, ` : ''}
      ${(explanation.length > 70) ? explanation.substring(0, 70) : explanation}
      `
    const descriptionCards = `
      ${(copyright) ? `${copyright}, ` : ''}
      ${(explanation.length > 120) ? explanation.substring(0, 120) : explanation}
      `
    const creator = `NASA${(copyright) ? `, ${copyright}` : ''}`
    const link = can

    console.log(dayData)
    return <>
      <Nav />
      {(dayData) ?
        <Head>
          <title>{titlePage}</title>
          <meta
            name="description"
            content={description}>
          </meta>

          {/* Open Grafh Tags */}
          <meta property="og:title" content={titleCards} />
          <meta property="og:description" content={descriptionCards} />
          <meta property="og:url" content={link} />

          {(media_type === 'image') ?
            <meta property="og:image" content={url} />
            : <meta property="og:video" content={url} />
          }

          {(media_type === 'image') ?
            <meta property="og:type" content="image" />
            : <meta property="og:type" content="video" />
          }

          {/* Twitter Tags */}
          <meta name="twitter:title" content={titleCards} />
          <meta name="twitter:description" content={descriptionCards} />
          <meta name="twitter:creator" content={creator} />


          {(media_type === 'image') ?
            <meta name="twitter:card" content="summary_large_image" />
            : <meta name="twitter:card" content="player" />
          }

          {(media_type === 'image') ?
            <meta name="twitter:image" content={url} />
            : <meta name="twitter:player" content={url} />
          }
        </Head> : ''}
      <main>
        {(dayData) ?
          <DayContent day={dayData} />
          : <DateNotExist />
        }
      </main>
      <Footer />
    </>;
  }
}

export default Day
